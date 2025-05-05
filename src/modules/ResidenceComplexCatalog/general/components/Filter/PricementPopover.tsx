import {
    Popover,
    Portal,
    Button,
   
  } from "@chakra-ui/react"
import PricementForm from "./PricementForm"

  
export const PricementPopover = () => {

    return (
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button variant="outline" size="md">
            Pricement
          </Button>
        </Popover.Trigger>
  
        <Portal>
          <Popover.Positioner>
            <Popover.Content width="360px" p="4">
              <Popover.Arrow />
              <Popover.Body>
                <PricementForm />
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    )
  }