"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Plus, Search, Settings, Menu, Clock, MapPin, Users, Calendar, Pause, Sparkles, X } from 'lucide-react'

export default function Home() {
  const sampleEvents = [
    // 2025 events
    { id: 1, title: "Team Meeting", startTime: "09:00", endTime: "10:00", color: "bg-blue-500", date: "2025-03-05", description: "Weekly team sync-up", location: "Conference Room A", attendees: ["John Doe", "Jane Smith", "Bob Johnson"], organizer: "Alice Brown" },
    { id: 2, title: "Lunch with Sarah", startTime: "12:30", endTime: "13:30", color: "bg-green-500", date: "2025-03-05", description: "Discuss project timeline", location: "Cafe Nero", attendees: ["Sarah Lee"], organizer: "You" },
    { id: 3, title: "Project Review", startTime: "14:00", endTime: "15:30", color: "bg-purple-500", date: "2025-03-07", description: "Q2 project progress review", location: "Meeting Room 3", attendees: ["Team Alpha", "Stakeholders"], organizer: "Project Manager" },
    { id: 4, title: "Client Call", startTime: "10:00", endTime: "11:00", color: "bg-yellow-500", date: "2025-03-06", description: "Quarterly review with major client", location: "Zoom Meeting", attendees: ["Client Team", "Sales Team"], organizer: "Account Manager" },
    { id: 5, title: "Team Brainstorm", startTime: "13:00", endTime: "14:30", color: "bg-indigo-500", date: "2025-03-08", description: "Ideation session for new product features", location: "Creative Space", attendees: ["Product Team", "Design Team"], organizer: "Product Owner" },
    
    // April 2025
    { id: 16, title: "Budget Planning", startTime: "10:00", endTime: "11:30", color: "bg-blue-400", date: "2025-04-10", description: "Q3 budget review", location: "Finance Room", attendees: ["Finance Team"], organizer: "CFO" },
    { id: 17, title: "Product Launch", startTime: "14:00", endTime: "16:00", color: "bg-red-500", date: "2025-04-15", description: "New feature launch event", location: "Main Hall", attendees: ["All Hands"], organizer: "CEO" },
    
    // May 2025
    { id: 18, title: "Team Offsite", startTime: "09:00", endTime: "17:00", color: "bg-green-600", date: "2025-05-20", description: "Quarterly team building", location: "Mountain Resort", attendees: ["Entire Team"], organizer: "HR" },
    
    // June 2025
    { id: 19, title: "Mid-Year Review", startTime: "10:00", endTime: "12:00", color: "bg-purple-600", date: "2025-06-30", description: "Half-year performance review", location: "Conference Center", attendees: ["All Managers"], organizer: "HR Director" },
    
    // 2026 events
    { id: 20, title: "New Year Planning", startTime: "09:00", endTime: "11:00", color: "bg-blue-600", date: "2026-01-05", description: "2026 strategic planning", location: "Board Room", attendees: ["Leadership Team"], organizer: "CEO" },
    { id: 21, title: "Spring Conference", startTime: "08:00", endTime: "17:00", color: "bg-teal-500", date: "2026-03-15", description: "Industry conference", location: "Convention Center", attendees: ["Select Team Members"], organizer: "Marketing" },
    
    // 2027 events
    { id: 22, title: "Anniversary Celebration", startTime: "18:00", endTime: "22:00", color: "bg-pink-600", date: "2027-06-15", description: "Company 10th anniversary", location: "Grand Hotel", attendees: ["All Employees"], organizer: "Events Team" },
    
    // 2028 events
    { id: 23, title: "Innovation Summit", startTime: "09:00", endTime: "16:00", color: "bg-orange-500", date: "2028-09-10", description: "Tech innovation showcase", location: "Tech Park", attendees: ["Tech Team"], organizer: "CTO" },
    
    // 2029 events
    { id: 24, title: "Global Expansion", startTime: "10:00", endTime: "12:00", color: "bg-indigo-600", date: "2029-11-20", description: "International office opening", location: "London Office", attendees: ["Executive Team"], organizer: "COO" },
    
    // 2030 events
    { id: 25, title: "Future Planning", startTime: "14:00", endTime: "16:00", color: "bg-cyan-600", date: "2030-01-10", description: "Next decade strategy", location: "Executive Suite", attendees: ["Board Members"], organizer: "CEO" },
  ]

  const [isLoaded, setIsLoaded] = useState(false)
  const [showAIPopup, setShowAIPopup] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [showCreateEventModal, setShowCreateEventModal] = useState(false)
  const [newEvent, setNewEvent] = useState({
    id: 0,
    title: "",
    startTime: "09:00",
    endTime: "10:00",
    color: "bg-blue-500",
    date: new Date().toISOString().split("T")[0],
    description: "",
    location: "",
    attendees: [],
    organizer: "You",
    isRecurring: false,
    recurrencePattern: "weekly",
    recurrenceEndDate: "",
  })
  const [attendeeInput, setAttendeeInput] = useState("")
  const [allEvents, setAllEvents] = useState(sampleEvents)
  const colorOptions = [
    { name: "Blue", value: "bg-blue-500" },
    { name: "Green", value: "bg-green-500" },
    { name: "Purple", value: "bg-purple-500" },
    { name: "Yellow", value: "bg-yellow-500" },
    { name: "Indigo", value: "bg-indigo-500" },
    { name: "Pink", value: "bg-pink-500" },
    { name: "Teal", value: "bg-teal-500" },
    { name: "Cyan", value: "bg-cyan-500" },
    { name: "Orange", value: "bg-orange-400" },
    { name: "Red", value: "bg-red-400" },
  ]

  useEffect(() => {
    setIsLoaded(true)

    const popupTimer = setTimeout(() => {
      setShowAIPopup(true)
    }, 3000)

    return () => clearTimeout(popupTimer)
  }, [])

  useEffect(() => {
    if (showAIPopup) {
      const text =
        "Looks like you don't have that many meetings today. Shall I play some Hans Zimmer essentials to help you get into your Flow State?"
      let i = 0
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setTypedText((prev) => prev + text.charAt(i))
          i++
        } else {
          clearInterval(typingInterval)
        }
      }, 50)

      return () => clearInterval(typingInterval)
    }
  }, [showAIPopup])

  const [currentView, setCurrentView] = useState("week")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const timeSlots = Array.from({ length: 9 }, (_, i) => i + 8)

  const calculateEventStyle = (startTime, endTime) => {
    const start = Number.parseInt(startTime.split(":")[0]) + Number.parseInt(startTime.split(":")[1]) / 60
    const end = Number.parseInt(endTime.split(":")[0]) + Number.parseInt(endTime.split(":")[1]) / 60
    const top = (start - 8) * 80
    const height = (end - start) * 80
    return { top: `${top}px`, height: `${height}px` }
  }

  const getMiniCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    
    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)
    
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const myCalendars = [
    { name: "My Calendar", color: "bg-blue-500" },
    { name: "Work", color: "bg-green-500" },
    { name: "Personal", color: "bg-purple-500" },
    { name: "Family", color: "bg-orange-500" },
  ]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleCreateEvent = () => {
    setShowCreateEventModal(true)
    const today = new Date()
    setNewEvent({
      id: Math.max(0, ...allEvents.map((e) => e.id)) + 1,
      title: "",
      startTime: "09:00",
      endTime: "10:00",
      color: "bg-blue-500",
      date: today.toISOString().split("T")[0],
      description: "",
      location: "",
      attendees: [],
      organizer: "You",
      isRecurring: false,
      recurrencePattern: "weekly",
      recurrenceEndDate: "",
    })
    setAttendeeInput("")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEvent((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAttendee = () => {
    if (attendeeInput.trim()) {
      setNewEvent((prev) => ({
        ...prev,
        attendees: [...prev.attendees, attendeeInput.trim()],
      }))
      setAttendeeInput("")
    }
  }

  const handleRemoveAttendee = (index) => {
    setNewEvent((prev) => ({
      ...prev,
      attendees: prev.attendees.filter((_, i) => i !== index),
    }))
  }

  const handleSubmitEvent = (e) => {
    e.preventDefault()

    if (!newEvent.title) {
      alert("Please enter an event title")
      return
    }

    setAllEvents((prev) => [...prev, newEvent])
    setShowCreateEventModal(false)
  }

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate)
    
    if (currentView === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (currentView === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else if (currentView === "month") {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getDateDisplay = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"]
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    
    if (currentView === "day") {
      return `${dayNames[currentDate.getDay()]}, ${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
    } else if (currentView === "week") {
      const weekDates = getWeekDates()
      const firstDate = weekDates[0]
      const lastDate = weekDates[6]
      
      if (firstDate.getMonth() === lastDate.getMonth()) {
        return `${monthNames[firstDate.getMonth()]} ${firstDate.getDate()}-${lastDate.getDate()}, ${firstDate.getFullYear()}`
      } else {
        return `${monthNames[firstDate.getMonth()]} ${firstDate.getDate()} - ${monthNames[lastDate.getMonth()]} ${lastDate.getDate()}, ${firstDate.getFullYear()}`
      }
    } else {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    }
  }

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0]
    return allEvents.filter(event => event.date === dateStr)
  }

  const navigateMiniCalendar = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
        alt="Beautiful mountain landscape"
        fill
        className="object-cover"
        priority
      />

      {/* Navigation */}
      <header
        className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6 opacity-0 ${isLoaded ? "animate-fade-in" : ""}`}
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex items-center gap-4">
          <Menu className="h-6 w-6 text-white" />
          <span className="text-2xl font-semibold text-white drop-shadow-lg">Calendar</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
            <input
              type="text"
              placeholder="Search"
              className="rounded-full bg-white/10 backdrop-blur-sm pl-10 pr-4 py-2 text-white placeholder:text-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
          <Settings className="h-6 w-6 text-white drop-shadow-md" />
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-md">
            U
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative h-screen w-full pt-20 flex">
        {/* Sidebar */}
        <div
          className={`w-64 h-full bg-white/10 backdrop-blur-lg p-4 shadow-xl border-r border-white/20 rounded-tr-3xl opacity-0 ${isLoaded ? "animate-fade-in" : ""} flex flex-col justify-between`}
          style={{ animationDelay: "0.4s" }}
        >
          <div>
            <button
              className="mb-6 flex items-center justify-center gap-2 rounded-full bg-blue-500 px-4 py-3 text-white w-full"
              onClick={handleCreateEvent}
            >
              <Plus className="h-5 w-5" />
              <span>Create</span>
            </button>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">
                  {new Date(currentDate.getFullYear(), currentDate.getMonth()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex gap-1">
                  <button className="p-1 rounded-full hover:bg-white/20" onClick={() => navigateMiniCalendar("prev")}>
                    <ChevronLeft className="h-4 w-4 text-white" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-white/20" onClick={() => navigateMiniCalendar("next")}>
                    <ChevronRight className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-xs text-white/70 font-medium py-1">
                    {day}
                  </div>
                ))}

                {getMiniCalendarDays().map((day, i) => {
                  const isToday = day === new Date().getDate() && 
                                  currentDate.getMonth() === new Date().getMonth() &&
                                  currentDate.getFullYear() === new Date().getFullYear()
                  
                  return (
                    <div
                      key={i}
                      className={`text-xs rounded-full w-7 h-7 flex items-center justify-center ${
                        isToday ? "bg-blue-500 text-white" : "text-white hover:bg-white/20"
                      } ${!day ? "invisible" : "cursor-pointer"}`}
                      onClick={() => {
                        if (day) {
                          const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                          setCurrentDate(newDate)
                        }
                      }}
                    >
                      {day}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* My Calendars */}
            <div>
              <h3 className="text-white font-medium mb-3">My calendars</h3>
              <div className="space-y-2">
                {myCalendars.map((cal, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-sm ${cal.color}`}></div>
                    <span className="text-white text-sm">{cal.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* New position for the big plus button */}
          <button
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-blue-500 p-4 text-white w-14 h-14 self-start"
            onClick={handleCreateEvent}
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {/* Calendar View */}
        <div
          className={`flex-1 flex flex-col opacity-0 ${isLoaded ? "animate-fade-in" : ""}`}
          style={{ animationDelay: "0.6s" }}
        >
          {/* Calendar Controls */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <div className="flex items-center gap-4">
              <button onClick={goToToday} className="px-4 py-2 text-white bg-blue-500 rounded-md">Today</button>
              <div className="flex">
                <button onClick={() => navigateDate("prev")} className="p-2 text-white hover:bg-white/10 rounded-l-md">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => navigateDate("next")} className="p-2 text-white hover:bg-white/10 rounded-r-md">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <h2 className="text-xl font-semibold text-white">{getDateDisplay()}</h2>
            </div>

            <div className="flex items-center gap-2 rounded-md p-1">
              <button
                onClick={() => setCurrentView("day")}
                className={`px-3 py-1 rounded ${currentView === "day" ? "bg-white/20" : ""} text-white text-sm`}
              >
                Day
              </button>
              <button
                onClick={() => setCurrentView("week")}
                className={`px-3 py-1 rounded ${currentView === "week" ? "bg-white/20" : ""} text-white text-sm`}
              >
                Week
              </button>
              <button
                onClick={() => setCurrentView("month")}
                className={`px-3 py-1 rounded ${currentView === "month" ? "bg-white/20" : ""} text-white text-sm`}
              >
                Month
              </button>
            </div>
          </div>

          {currentView === "day" && (
            <div className="flex-1 overflow-auto p-4">
              <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl h-full">
                {/* Day Header */}
                <div className="border-b border-white/20 p-4">
                  <div className="text-center">
                    <div className="text-sm text-white/70 font-medium">
                      {["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"][currentDate.getDay()]}
                    </div>
                    <div className="text-3xl font-semibold text-white mt-1">{currentDate.getDate()}</div>
                  </div>
                </div>

                {/* Time Grid for Single Day */}
                <div className="grid grid-cols-[80px_1fr]">
                  {/* Time Labels */}
                  <div className="text-white/70">
                    {timeSlots.map((time, i) => (
                      <div key={i} className="h-20 border-b border-white/10 pr-2 text-right text-xs flex items-start pt-1">
                        {time > 12 ? `${time - 12} PM` : `${time} AM`}
                      </div>
                    ))}
                  </div>

                  {/* Day Column */}
                  <div className="border-l border-white/20 relative">
                    {timeSlots.map((_, timeIndex) => (
                      <div key={timeIndex} className="h-20 border-b border-white/10"></div>
                    ))}

                    {/* Events for current day */}
                    {getEventsForDate(currentDate).map((event, i) => {
                      const eventStyle = calculateEventStyle(event.startTime, event.endTime)
                      return (
                        <div
                          key={i}
                          className={`absolute ${event.color} rounded-md p-3 text-white shadow-md cursor-pointer transition-all duration-200 ease-in-out hover:translate-y-[-2px] hover:shadow-lg ${event.isRecurring ? "border-l-4 border-white" : ""}`}
                          style={{
                            ...eventStyle,
                            left: "8px",
                            right: "8px",
                          }}
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="font-semibold text-sm">{event.title}</div>
                          <div className="opacity-90 text-xs mt-1">{`${event.startTime} - ${event.endTime}`}</div>
                          {event.location && (
                            <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === "week" && (
            <div className="flex-1 overflow-auto p-4">
              <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl h-full">
                {/* Week Header */}
                <div className="grid grid-cols-8 border-b border-white/20">
                  <div className="p-2 text-center text-white/50 text-xs"></div>
                  {getWeekDates().map((date, i) => {
                    const isToday = date.toDateString() === new Date().toDateString()
                    return (
                      <div key={i} className="p-2 text-center border-l border-white/20">
                        <div className="text-xs text-white/70 font-medium">{weekDays[i]}</div>
                        <div
                          className={`text-lg font-medium mt-1 text-white ${isToday ? "bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mx-auto" : ""}`}
                        >
                          {date.getDate()}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Time Grid */}
                <div className="grid grid-cols-8">
                  {/* Time Labels */}
                  <div className="text-white/70">
                    {timeSlots.map((time, i) => (
                      <div key={i} className="h-20 border-b border-white/10 pr-2 text-right text-xs">
                        {time > 12 ? `${time - 12} PM` : `${time} AM`}
                      </div>
                    ))}
                  </div>

                  {/* Days Columns */}
                  {getWeekDates().map((date, dayIndex) => (
                    <div key={dayIndex} className="border-l border-white/20 relative">
                      {timeSlots.map((_, timeIndex) => (
                        <div key={timeIndex} className="h-20 border-b border-white/10"></div>
                      ))}

                      {/* Events */}
                      {getEventsForDate(date).map((event, i) => {
                        const eventStyle = calculateEventStyle(event.startTime, event.endTime)
                        return (
                          <div
                            key={i}
                            className={`absolute ${event.color} rounded-md p-2 text-white text-xs shadow-md cursor-pointer transition-all duration-200 ease-in-out hover:translate-y-[-2px] hover:shadow-lg ${event.isRecurring ? "border-l-4 border-white" : ""}`}
                            style={{
                              ...eventStyle,
                              left: "4px",
                              right: "4px",
                            }}
                            onClick={() => handleEventClick(event)}
                          >
                            <div className="font-medium">{event.title}</div>
                            <div className="opacity-80 text-[10px] mt-1">{`${event.startTime} - ${event.endTime}`}</div>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === "month" && (
            <div className="flex-1 overflow-auto p-4">
              <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl h-full">
                {/* Month Header */}
                <div className="grid grid-cols-7 border-b border-white/20">
                  {weekDays.map((day, i) => (
                    <div key={i} className="p-4 text-center border-r border-white/20 last:border-r-0">
                      <div className="text-sm text-white/70 font-medium">{day}</div>
                    </div>
                  ))}
                </div>

                {/* Month Grid */}
                <div className="grid grid-cols-7 h-[calc(100%-60px)]">
                  {getMiniCalendarDays().map((day, i) => {
                    const date = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null
                    const dayEvents = date ? getEventsForDate(date) : []
                    const isToday = date && date.toDateString() === new Date().toDateString()

                    return (
                      <div
                        key={i}
                        className={`border-r border-b border-white/20 p-2 min-h-[120px] ${!day ? "bg-white/5" : "hover:bg-white/10 cursor-pointer"}`}
                      >
                        {day && (
                          <>
                            <div
                              className={`text-sm font-medium mb-2 ${
                                isToday ? "bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center" : "text-white"
                              }`}
                            >
                              {day}
                            </div>
                            <div className="space-y-1">
                              {dayEvents.slice(0, 3).map((event, eventIndex) => (
                                <div
                                  key={eventIndex}
                                  className={`${event.color} rounded px-2 py-1 text-white text-xs cursor-pointer hover:opacity-80 transition-opacity`}
                                  onClick={() => handleEventClick(event)}
                                >
                                  <div className="font-medium truncate">{event.title}</div>
                                  <div className="text-[10px] opacity-80">{event.startTime}</div>
                                </div>
                              ))}
                              {dayEvents.length > 3 && (
                                <div className="text-white/70 text-xs px-2">+{dayEvents.length - 3} more</div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Popup */}
        {showAIPopup && (
          <div className="fixed bottom-8 right-8 z-20">
            <div className="w-[450px] relative bg-gradient-to-br from-blue-400/30 via-blue-500/30 to-blue-600/30 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-blue-300/30 text-white">
              <button
                onClick={() => setShowAIPopup(false)}
                className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-blue-300" />
                </div>
                <div className="min-h-[80px]">
                  <p className="text-base font-light">{typedText}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={togglePlay}
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors font-medium"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowAIPopup(false)}
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors font-medium"
                >
                  No
                </button>
              </div>
              {isPlaying && (
                <div className="mt-4 flex items-center justify-between">
                  <button
                    className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-white text-sm hover:bg-white/20 transition-colors"
                    onClick={togglePlay}
                  >
                    <Pause className="h-4 w-4" />
                    <span>Pause Hans Zimmer</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${selectedEvent.color} p-6 rounded-lg shadow-xl max-w-md w-full mx-4`}>
              <h3 className="text-2xl font-bold mb-4 text-white">{selectedEvent.title}</h3>
              <div className="space-y-3 text-white">
                <p className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  {`${selectedEvent.startTime} - ${selectedEvent.endTime}`}
                </p>
                <p className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  {selectedEvent.location}
                </p>
                <p className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  {new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                {selectedEvent && selectedEvent.isRecurring && (
                  <p className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>
                      <strong>Recurs:</strong>{" "}
                      {selectedEvent.recurrencePattern.charAt(0).toUpperCase() +
                        selectedEvent.recurrencePattern.slice(1)}
                      {selectedEvent.recurrenceEndDate &&
                        ` until ${new Date(selectedEvent.recurrenceEndDate).toLocaleDateString()}`}
                    </span>
                  </p>
                )}
                <p className="flex items-start">
                  <Users className="mr-2 h-5 w-5 mt-1" />
                  <span>
                    <strong>Attendees:</strong>
                    <br />
                    {selectedEvent.attendees.join(", ") || "No attendees"}
                  </span>
                </p>
                <p>
                  <strong>Organizer:</strong> {selectedEvent.organizer}
                </p>
                <p>
                  <strong>Description:</strong> {selectedEvent.description}
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
                  onClick={() => setSelectedEvent(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Event Modal */}
        {showCreateEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white/20 backdrop-blur-lg p-6 rounded-lg shadow-xl max-w-md w-full mx-4 border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-4 text-white">Create New Event</h3>

              <form onSubmit={handleSubmitEvent} className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Event title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-1">Start Time</label>
                    <input
                      type="time"
                      name="startTime"
                      value={newEvent.startTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-1">End Time</label>
                    <input
                      type="time"
                      name="endTime"
                      value={newEvent.endTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isRecurring"
                      checked={newEvent.isRecurring}
                      onChange={(e) => setNewEvent((prev) => ({ ...prev, isRecurring: e.target.checked }))}
                      className="mr-2 h-4 w-4 rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500"
                    />
                    <label htmlFor="isRecurring" className="text-white text-sm font-medium">
                      Recurring Event
                    </label>
                  </div>
                </div>

                {newEvent.isRecurring && (
                  <div className="space-y-4 mt-4 p-4 bg-white/5 rounded-md border border-white/10">
                    <div>
                      <label className="block text-white text-sm font-medium mb-1">Recurrence Pattern</label>
                      <select
                        name="recurrencePattern"
                        value={newEvent.recurrencePattern}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-1">End Date (Optional)</label>
                      <input
                        type="date"
                        name="recurrenceEndDate"
                        value={newEvent.recurrenceEndDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-white text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={newEvent.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Event location"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                    placeholder="Event description"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-1">Attendees</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={attendeeInput}
                      onChange={(e) => setAttendeeInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add attendee"
                    />
                    <button
                      type="button"
                      onClick={handleAddAttendee}
                      className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  {newEvent.attendees.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newEvent.attendees.map((attendee, index) => (
                        <div key={index} className="flex items-center bg-white/10 rounded-full px-3 py-1">
                          <span className="text-white text-sm">{attendee}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveAttendee(index)}
                            className="ml-2 text-white/70 hover:text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateEventModal(false)}
                    className="px-4 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
