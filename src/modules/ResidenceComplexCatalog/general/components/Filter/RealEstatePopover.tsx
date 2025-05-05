import {
    Popover,
    Portal,
    Button,
    Tabs,
   
  } from "@chakra-ui/react"
import ApartmentForm from "./ApartmentForm"
import CommercialForm from "./NonResidentialForm"
  
  export const RealEstatePopover = () => {

    return (
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button variant="outline" size="md">
            Real estate parameters
          </Button>
        </Popover.Trigger>
  
        <Portal>
          <Popover.Positioner>
            <Popover.Content width="900px" p="4">
              <Popover.Arrow />
              <Popover.Body>
                <Tabs.Root defaultValue="residential">
                  <Tabs.List rounded="lg" p="1" mb="4" gap="2">
                    <Tabs.Trigger value="residential">
                        Residential premises
                    </Tabs.Trigger>
                    <Tabs.Trigger value="commercial" >
                    Non-residential premises
                    </Tabs.Trigger>
                    <Tabs.Indicator rounded="md" />
                  </Tabs.List>
  
                  <Tabs.Content value="residential">
                    <ApartmentForm />
                  </Tabs.Content>
  
                  <Tabs.Content value="commercial">
                    <CommercialForm />
                  </Tabs.Content>
                </Tabs.Root>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    )
  }