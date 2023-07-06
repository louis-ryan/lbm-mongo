import { useEffect, useState, useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import useGetUnlimitedNotes from '../custom_hooks/useGetUnlimitedNotes';
import fetch from 'isomorphic-unfetch';
import FilterComp from '../components/Filter/FilterComp';
import ListingComp from '../components/Listing/ListingComp';
import WelcomeComp from '../components/WelcomeComp';
import useWindowWidth from '../custom_hooks/useWindowWidth';
import useGetFilteredNotes from '../custom_hooks/useGetFilteredNotes';
import useGetFilter from '../custom_hooks/useGetFilter';
import ListingEditToggle from '../components/Listing/ListingEditToggle';
import useUpdateFilter from '../custom_hooks/useUpdateFilter';


const Index = () => {


  const windowWidth = useWindowWidth()
  const [mobileView, setMobileView] = useState("NOTES")
  const { user } = useUser()
  const router = useRouter()
  const desktopComp = useRef()
  const { filter, setFilter } = useGetFilter(user)
  const unlimitedNotes = useGetUnlimitedNotes(filter)
  const { notes, rendering, filterUpdating, setFilterUpdating, skipping, setSkipping, getSkippedNotes } = useGetFilteredNotes(filter)
  const { updateFilter } = useUpdateFilter(user, router, setFilterUpdating, filter, setFilter)


  /**
   * Handle redirections after auth0 login
   */
  // useEffect(() => {
  //   if (!localStorage.getItem("redirect_to")) return
  //   const route = localStorage.getItem("redirect_to")
  //   window.location.replace(route)
  //   localStorage.removeItem("redirect_to")
  // })


  /**
   * Check for expired posts and delete them
   */
  useEffect(() => {
    async function deleteExpired() { await fetch(`api/notes/deletion`) }
    deleteExpired()
  }, [])


  if (windowWidth > 1200) {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div ref={desktopComp} style={{ marginTop: "152px", width: "1200px", zoom: "0.8" }}>
          <div style={{ position: "absolute", width: "100%", top: "-420px", left: "0px", zIndex: "-1", height: "720px", overflow: "hidden", filter: "brightness(0.8)", opacity: "1" }}>
            <img
              width="1500"
              src={"https://www.austapestry.com.au/sites/default/files/tapestry/Mob1.jpg"}
              style={{ width: "100%", marginTop: "120px", filter: "brightness(0.6) saturate(0.8) blur(2px)", transform: "scale(1.05)" }}
            />
          </div>
          <div style={{ position: "absolute", top: "16px", left: "24px" }}>
            <img src="https://images.squarespace-cdn.com/content/v1/56dce00a45bf214a0b3fadf3/5cf24fcb-d5dc-44b2-a321-b28ee3d3e00d/lbm_new_logo.png?format=500w" />
          </div>
          <WelcomeComp user={user} filter={filter} setFilter={setFilter} deviceSize={"DESKTOP"} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "29%" }}>
              <FilterComp filter={filter} setFilter={setFilter} updateFilter={updateFilter} filterUpdating={filterUpdating} notes={notes} deviceSize={"DESKTOP"} />
            </div>
            <div style={{ width: "69%" }}>
              <ListingComp notes={notes} rendering={rendering} unlimitedNotes={unlimitedNotes} skipping={skipping} setSkipping={setSkipping} getSkippedNotes={getSkippedNotes} deviceSize={"DESKTOP"} />
            </div>
          </div>
        </div>
      </div >
    )
  } else {
    return (
      <div style={{ width: "100%" }}>
        <div style={{ zoom: "0.8" }}>
          <div style={{ position: "absolute", width: "100%", top: "-420px", left: "0px", zIndex: "-1", height: "720px", overflow: "hidden", filter: "brightness(0.8)", opacity: "1" }}>
            <img
              width="1500"
              src={"https://www.austapestry.com.au/sites/default/files/tapestry/Mob1.jpg"}
              style={{ width: "100%", marginTop: "340px", filter: "brightness(0.6) saturate(0.8) blur(1px)", transform: "scale(3.5)" }}
            />
          </div>
          <WelcomeComp user={user} filter={filter} setFilter={setFilter} deviceSize={"MOBILE"} />
        </div>
        <div style={{ outline: "4px solid black", borderRadius: "16px", backgroundColor: "white", padding: "4px" }}>
          <ListingEditToggle mobileView={mobileView} setMobileView={setMobileView} />
          {mobileView === "FILTERS" && (
            <FilterComp filter={filter} setFilter={setFilter} updateFilter={updateFilter} filterUpdating={filterUpdating} notes={notes} deviceSize={"MOBILE"} />
          )}
          {mobileView === "NOTES" && (
            <ListingComp notes={notes} rendering={rendering} unlimitedNotes={unlimitedNotes} skipping={skipping} setSkipping={setSkipping} getSkippedNotes={getSkippedNotes} deviceSize={"MOBILE"} />
          )}
        </div>
      </div>
    )
  }


}

export default Index;