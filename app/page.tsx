import EventCard from "@/components/EventCard"
import ExploreBtn from "@/components/ExploreBtn"
import { events } from "@/lib/constants"
import { time } from "console"



const Page = () => {
  return (
    <section>
      <h1 className="text-center">The Hub for Every Dev <br /> Event You Can't Miss</h1>
      <p className="text-center mt-5">Hackethons, Meetups, and Conferences, All in one Place </p>
      <ExploreBtn/>
      <div className="mt-20 space-y-4">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.map((event)=>(
            <li className="list-none" key={event.title}>
              <EventCard {...event}/>
            </li>
          ))}

        </ul> 
      </div>
    </section>
  )

}

export default Page