import { Stack, Field, Button, Popover, Slider } from "@chakra-ui/react"; // если используете Radix UI
import { useForm, Controller } from "react-hook-form";
import { useLocalStore } from "./../../hooks";


type FormValues = {
  pricementRange: [number, number];
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "KZT", maximumFractionDigits: 0 }).format(value);

const MIN_PRICE = 35911500;
const MAX_PRICE = 84167300;

export default function PricementForm() {
  const setMinMaxPrice = useLocalStore((state) => state.setMinMaxPrice);
  const min_total_price = useLocalStore((state) => state.min_total_price);
  const max_total_price = useLocalStore((state) => state.max_total_price);
  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: { pricementRange: [min_total_price ?? MIN_PRICE, max_total_price ?? MAX_PRICE] },
  });

  const pricementRange = watch("pricementRange", [MIN_PRICE, MAX_PRICE]);
  const [min, max] = Array.isArray(pricementRange) ? pricementRange : [MIN_PRICE, MAX_PRICE];

  const onSubmit = ({ pricementRange }: FormValues) => {
    const [minVal, maxVal] = pricementRange;
    setMinMaxPrice(minVal, maxVal);
  };

  const handleReset = () => reset();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="4">
        <Field.Root>
          <Field.Label>
            Price from {formatPrice(min)} to {formatPrice(max)}
          </Field.Label>
          <Controller
            name="pricementRange"
            control={control}
            render={({ field: { value, onChange } }) => (
                <Slider.Root
                value={value}
                onValueChange={({value}) => {
                  onChange(value)
                }}
                min={MIN_PRICE}
                max={MAX_PRICE}
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
  );
}
