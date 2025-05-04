// src/modules/Projects/general/components/Filter/RealEstatePopover.tsx

import {
    Popover,
    Portal,
    Button,
    Stack,
    Tabs,
    SimpleGrid,
    Slider,
    Field,
  } from "@chakra-ui/react"
  import { LuBuilding2 } from "react-icons/lu"
  import { RadioCardItem, RadioCardRoot } from "./RadioCardItem"
  
  export const RealEstatePopover = () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline" size="md">
          Параметры недвижимости
        </Button>
      </Popover.Trigger>
  
      <Portal>
        <Popover.Positioner>
          <Popover.Content width="900px" p="4">
            <Popover.Arrow />
            <Popover.Body>
              <Tabs.Root defaultValue="residential">
                <Tabs.List
                  bg="gray.100"
                  rounded="lg"
                  p="1"
                  mb="4"
                  gap="2"
                >
                  <Tabs.Trigger value="residential">
                    Жилые помещения
                  </Tabs.Trigger>
                  <Tabs.Trigger value="commercial">
                    Нежилые помещения
                  </Tabs.Trigger>
                  <Tabs.Indicator rounded="md" />
                </Tabs.List>
  
                {/* Жилые помещения */}
                <Tabs.Content value="residential">
                  <Stack gap="4">
                    <Field.Root>
                      <Field.Label>Класс жилья</Field.Label>
                      <RadioCardRoot defaultValue="all">
                        <SimpleGrid columns={5} gap="4">
                          <RadioCardItem value="all" label="Все" />
                          <RadioCardItem value="standard" label="Стандарт" />
                          <RadioCardItem value="comfort" label="Комфорт" />
                          <RadioCardItem value="business" label="Бизнес" />
                          <RadioCardItem value="premium" label="Премиум" />
                        </SimpleGrid>
                      </RadioCardRoot>
                    </Field.Root>
  
                    <Field.Root>
                      <Field.Label>Комнатность</Field.Label>
                      <RadioCardRoot defaultValue="all">
                        <SimpleGrid columns={6} gap="4">
                          <RadioCardItem value="all" label="Все" />
                          <RadioCardItem value="studio" label="СТ" />
                          <RadioCardItem value="1" label="1" />
                          <RadioCardItem value="2" label="2" />
                          <RadioCardItem value="3" label="3" />
                          <RadioCardItem value="4+" label="4+" />
                        </SimpleGrid>
                      </RadioCardRoot>
                    </Field.Root>
  
                    <Field.Root>
                      <Field.Label>Площадь, м²</Field.Label>
                      <Slider.Root defaultValue={[25, 350]} min={0} max={500} width={'full'}>
                        <Slider.Control>
                          <Slider.Track>
                            <Slider.Range />
                          </Slider.Track>
                          <Slider.Thumbs />
                        </Slider.Control>
                      </Slider.Root>
                    </Field.Root>
  
  
                    <Stack direction="row" justify="space-between" gap="2" pt="4">
                      <Button variant="ghost" size="sm">
                        Сбросить
                      </Button>
                      <Button variant="solid" size="sm">
                        Принять
                      </Button>
                    </Stack>
                  </Stack>
                </Tabs.Content>
  
                {/* Нежилые помещения */}
                <Tabs.Content value="commercial">
                  <Stack gap="4">
                    <Field.Root>
                      <Field.Label>Тип помещения</Field.Label>
                      <RadioCardRoot defaultValue="commercial">
                        <SimpleGrid columns={3} gap="4">
                          <RadioCardItem
                            value="commercial"
                            label="Коммерческое"
                            icon={<LuBuilding2 />}
                          />
                          <RadioCardItem value="parking" label="Паркинг" />
                          <RadioCardItem value="storage" label="Кладовая" />
                        </SimpleGrid>
                      </RadioCardRoot>
                    </Field.Root>
  
                    <Field.Root>
                      <Field.Label>Площадь, м²</Field.Label>
                      <Slider.Root defaultValue={[1.5, 50]} min={0} max={100} width={'full'}>
                        <Slider.Control>
                          <Slider.Track>
                            <Slider.Range />
                          </Slider.Track>
                          <Slider.Thumbs />
                        </Slider.Control>
                      </Slider.Root>
                    </Field.Root>
  
                    <Stack direction="row" justify="space-between" gap="2" pt="4">
                      <Button variant="ghost" size="sm">
                        Сбросить
                      </Button>
                      <Button variant="solid" size="sm">
                        Принять
                      </Button>
                    </Stack>
                  </Stack>
                </Tabs.Content>
              </Tabs.Root>
            </Popover.Body>
  
            <Popover.CloseTrigger />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
  