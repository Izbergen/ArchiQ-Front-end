import { Stack, Field, SimpleGrid, Button, Popover, Slider, Tabs } from "@chakra-ui/react";
import { RadioCardItem, RadioCardRoot } from "./RadioCardItem";
import { useForm, Controller } from "react-hook-form";
import { useLocalStore } from "./../../hooks";

type CommercialTypes = "commercial" | "parking" | "storage";
type FormValues = {
  type: CommercialTypes;
  areaRange: [number, number];
};

export default function CommercialForm() {
  const setCommerceFields = useLocalStore((s) => s.setCommerceFields);
  const setParkingFields = useLocalStore((s) => s.setParkingFields);
  const setBoxroomFields = useLocalStore((s) => s.setBoxroomFields);

  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: {
      type: "commercial",
      areaRange: [0, 100],
    },
  });

  const [min, max] = watch("areaRange");

  const onSubmit = ({ type, areaRange }: FormValues) => {
    const [min_area, max_area] = areaRange;

    if (type === "commercial") {
      setCommerceFields({ max_area, min_area });
    } else if (type === "parking") {
      setParkingFields({ max_area, min_area });
    } else if (type === "storage") {
      setBoxroomFields({ max_area, min_area });
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Tabs.Content value="commercial">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="4">
          <Field.Root>
            <Field.Label>Тип помещения</Field.Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <RadioCardRoot
                  {...field}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SimpleGrid columns={3} gap="4">
                    <RadioCardItem value="commercial" label="Commercial" />
                    <RadioCardItem value="parking" label="Parking" />
                    <RadioCardItem value="storage" label="Boxroom" />
                  </SimpleGrid>
                </RadioCardRoot>
              )}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Area, from {min} to {max} m²</Field.Label>
            <Controller
              name="areaRange"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Slider.Root
                  value={value}
                  onValueChange={({value}) => {
                    onChange(value)
                  }}
                  min={0}
                  max={100}
                  width="full"
                >
                  <Slider.Control>
                    <Slider.Track>
                      <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumbs />
                  </Slider.Control>
                </Slider.Root>
              )}
            />
          </Field.Root>

          <Stack direction="row" justify="space-between" gap="2" pt="4">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset
            </Button>
            <Popover.CloseTrigger asChild>
              <Button type="submit" variant="solid" size="sm">
                Submit
              </Button>
            </Popover.CloseTrigger>
          </Stack>
        </Stack>
      </form>
    </Tabs.Content>
  );
}
