import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  Badge,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import useCalendar from '@veccu/react-calendar'
import { version } from '@veccu/react-calendar/package.json'
import { format } from 'date-fns'
import locale from 'date-fns/locale/en-US'
import React from 'react'

import { Container } from '../components/Container'

export default function BasicExample() {
  const { cursorDate, headers, body, navigation, view } = useCalendar()

  return (
    <Container height="100vh">
      <Stack
        padding={12}
        justifyContent="center"
        direction="column"
        alignItems="center"
        spacing={4}
      >
        <Badge
          colorScheme="green"
          fontSize="1.2em"
          px={2}
          textTransform="lowercase"
          aria-label="badge for current version"
        >
          v{version}
        </Badge>
        <Heading as="h1" size="xl">
          react-calendar-basic-example
        </Heading>
        <Text color="gray.500">
          Headless Calendar UI Library Example with Charkra UI
        </Text>
      </Stack>

      <Table variant="simple" size="lg">
        <TableCaption placement="top">
          <nav>
            <Flex justify="space-between" width="w.100">
              <Stack direction="row" gutter={4}>
                <Button
                  size="md"
                  onClick={view.showMonthView}
                  isActive={view.isMonthView}
                  aria-label="button for changing view type to month"
                >
                  M
                </Button>
                <Button
                  size="md"
                  onClick={view.showWeekView}
                  isActive={view.isWeekView}
                  aria-label="button for changing view type to week"
                >
                  W
                </Button>
                <Button
                  size="md"
                  onClick={view.showDayView}
                  isActive={view.isDayView}
                  aria-label="button for changing view type to day"
                >
                  D
                </Button>
              </Stack>
              <Text fontSize="2xl" data-testid="cursor-date">
                {format(cursorDate, 'yyyy. MM')}
              </Text>
              <Stack direction="row" gutter={8}>
                <IconButton
                  aria-label="button for navigating to prev calendar"
                  icon={<ChevronLeftIcon />}
                  onClick={navigation.toPrev}
                />
                <Button
                  size="md"
                  colorScheme="teal"
                  onClick={navigation.setToday}
                  aria-label="button for navigating to today calendar"
                >
                  TODAY
                </Button>
                <IconButton
                  aria-label="button for navigating to next calendar"
                  icon={<ChevronRightIcon />}
                  onClick={navigation.toNext}
                />
              </Stack>
            </Flex>
          </nav>
        </TableCaption>
        <Thead>
          <Tr>
            {headers.weekDays.map(({ key, value }) => {
              return (
                <Th key={key} data-testid="calendar-weekends">
                  {format(value, 'E', { locale })}
                </Th>
              )
            })}
          </Tr>
        </Thead>
        <Tbody>
          {body.value.map((week) => {
            const { key, value: days } = week

            return (
              <Tr key={key} data-testid="calendar-weeks">
                {days.map((day) => {
                  const { key, date, isCurrentDate, isCurrentMonth } = day

                  return (
                    <Td
                      key={key}
                      opacity={isCurrentMonth ? 1 : 0.2}
                      data-testid={
                        isCurrentDate ? 'calendar-cell--today' : 'calendar-cell'
                      }
                    >
                      {isCurrentDate ? (
                        <Text fontWeight="bold" color="teal.500">
                          {date}
                        </Text>
                      ) : (
                        date
                      )}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Container>
  )
}
