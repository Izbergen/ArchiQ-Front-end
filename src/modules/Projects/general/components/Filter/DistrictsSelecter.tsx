'use client'

import { useEffect, useState } from "react"
import {
  Field,
  Select,
  Portal,
  createListCollection,
  Spinner,
  Flex,
} from "@chakra-ui/react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { IDistrict } from "@/general/types/api.types"
import { CoreTypes } from "@/general/di/modules/core"
import { useDI } from "@/general/hooks/useDI"
import { IAxiosService } from "@/general/services/axios"
import { IAPI } from "@/general/constants/api.constants"
import { useLocalStore } from "../../hooks"

// теперь поле — массив строк
const formSchema = z.object({
  district: z.string({ message: "Район обязателен" }).array(),
})
type FormValues = z.infer<typeof formSchema>

export default function DistrictsSelector() {
  const [districts, setDistricts] = useState<IDistrict[]>([])
  const selectedDistrict = useLocalStore((s) => s.district)
  const setDistrict = useLocalStore((s) => s.setDistrict)

  const axiosService = useDI<IAxiosService>(CoreTypes.AxiosService)
  const apiConstants = useDI<IAPI>(CoreTypes.ApiConstants)

  const {
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // если есть выбранный район — оборачиваем в массив, иначе пустой массив
      district: selectedDistrict != null ? [String(selectedDistrict)] : [],
    },
  })

  useEffect(() => {
    axiosService
      .get<IDistrict[]>(apiConstants.URLS.DISTRICTS)
      .then(setDistricts)
      .catch((err) => console.error("Не удалось загрузить районы:", err))
  }, [axiosService, apiConstants.URLS.DISTRICTS])

  if (districts.length === 0) {
    return (
      <Flex justify="center" py={4}>
        <Spinner />
      </Flex>
    )
  }

  // коллекция для Select.Root
  const collection = createListCollection({
    items: districts.map((d) => ({
      label: d.name,
      value: String(d.id),
    })),
  })

  return (
    <Field.Root invalid={!!errors.district} width="320px">
      <Field.Label>Выберите район</Field.Label>

      <Controller
        name="district"
        control={control}
        render={({ field }) => (
          <Select.Root
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => {
              field.onChange(value)
              if (value.length > 0) {
                setDistrict(Number(value[0]))
              } 
            }}
            onInteractOutside={() => field.onBlur()}
            collection={collection}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select district" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {collection.items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />

      <Field.ErrorText>{errors.district?.message}</Field.ErrorText>
    </Field.Root>
  )
}
