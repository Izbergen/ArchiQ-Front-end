import { Stack, Field, SimpleGrid, Button, Popover, Slider } from "@chakra-ui/react";
import { APARTMENT_CLASS, ROOMS } from "@/general/types/api.types";
import { RadioCardItem, RadioCardRoot } from "./RadioCardItem";
import { useForm, Controller } from "react-hook-form";
import { useLocalStore } from "./../../hooks";

const MIN_AREA=40.35;
const MAX_AREA=100;

const MIN_FLOOR=1;
const MAX_FLOOR=17;        

type FormValues = {
  class_type: APARTMENT_CLASS;
  rooms: ROOMS;
  areaRange: [number, number];
  floorRange: [number, number];     
};

export default function ApartmentForm() {
  const setApartmentFields = useLocalStore((s) => s.setApartmentFields);
  const class_type = useLocalStore((s) => s.class_type);
  const min_area = useLocalStore((s) => s.min_area);
  const max_area = useLocalStore((s) => s.max_area);
  const min_floor = useLocalStore((s) => s.min_floor);
  const max_floor = useLocalStore((s) => s.max_floor);
  const {
    control,
    handleSubmit,
    reset
  } = useForm<FormValues>({
    defaultValues: {
      class_type: class_type ?? APARTMENT_CLASS.ALL,
      rooms: ROOMS.ALL,
      areaRange: [min_area ?? MIN_AREA, max_area ?? MAX_AREA],
      floorRange: [min_floor ?? MIN_FLOOR, max_floor ?? MAX_FLOOR]
    }
  });

  const onSubmit = (data: FormValues) => {
    const classType = data.class_type === APARTMENT_CLASS.ALL ? null : data.class_type;
    const roomsValue = data.rooms === ROOMS.ALL ? null : Number(data.rooms);

    setApartmentFields({
      class_type: classType,
      rooms: roomsValue,
      min_area: data.areaRange[0],
      max_area: data.areaRange[1],
      min_floor: data.floorRange[0],
      max_floor: data.floorRange[1]
    });
  };

  const handleReset = () => {
    reset();      
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="4">
        <Field.Root>
          <Field.Label>Housing class</Field.Label>
          <Controller
            name="class_type"
            control={control}
            render={({ field }) => (
              <RadioCardRoot
                {...field}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SimpleGrid columns={5} gap="4">
                  <RadioCardItem value={APARTMENT_CLASS.ALL} label="ALL" />
                  <RadioCardItem value={APARTMENT_CLASS.STANDARD} label="Standard" />
                  <RadioCardItem value={APARTMENT_CLASS.COMFORT} label="Comfort" />
                  <RadioCardItem value={APARTMENT_CLASS.BUSINESS} label="Business" />
                  <RadioCardItem value={APARTMENT_CLASS.PREMIUM} label="Premium" />
                </SimpleGrid>
              </RadioCardRoot>
            )}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Roominess</Field.Label>
          <Controller
            name="rooms"
            control={control}
            render={({ field }) => (
              <RadioCardRoot
                {...field}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SimpleGrid columns={6} gap="4">
                  <RadioCardItem value={ROOMS.ALL} label={ROOMS.ALL} />
                  <RadioCardItem value={ROOMS.ONE} label={ROOMS.ONE} />
                  <RadioCardItem value={ROOMS.TWO} label={ROOMS.TWO} />
                  <RadioCardItem value={ROOMS.THREE} label={ROOMS.THREE} />
                  <RadioCardItem value={ROOMS.FOUR} label={ROOMS.FOUR} />
                </SimpleGrid>
              </RadioCardRoot>
            )}
          />
        </Field.Root>

        <Field.Root>
          
          <Controller
            name="areaRange"
            control={control}
            render={({ field: { value, onChange } }) => (
                <>
                <Field.Label>Area, from {value[0]} to {value[1]} m²</Field.Label>
                <Slider.Root value={value} onValueChange={({value}) => {
                    onChange(value)
                }} min={MIN_AREA} max={MAX_AREA} width={'full'}>
                        <Slider.Control>
                          <Slider.Track>
                            <Slider.Range />
                          </Slider.Track>
                          <Slider.Thumbs />
                        </Slider.Control>
                </Slider.Root>
              </>
            )}
          />
        </Field.Root>
        <Field.Root>
          
          <Controller
            name="floorRange"
            control={control}
            render={({ field: { value, onChange } }) => (
                <>
                <Field.Label>Floor, from {value[0]} to {value[1]}</Field.Label>
                <Slider.Root value={value} onValueChange={({value}) => {
                    onChange(value)
                }} min={MIN_FLOOR} max={MAX_FLOOR} width={'full'}>
                        <Slider.Control>
                          <Slider.Track>
                            <Slider.Range />
                          </Slider.Track>
                          <Slider.Thumbs />
                        </Slider.Control>
                </Slider.Root>
              </>
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
  );
}
