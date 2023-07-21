import { useEffect, useState, useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
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

  const { lastFilterFromServer, setLastFilterFromServer, unlimitedNotes, filter, setFilter } = useGetFilter(user)
  const { notes, rendering, filterUpdating, setFilterUpdating, skipping, setSkipping, getSkippedNotes, initialised } = useGetFilteredNotes(filter, user)
  const { updateFilter, deleteFilter } = useUpdateFilter(user, router, setFilterUpdating, filter, setFilter, setLastFilterFromServer)


  /**
   * Check for expired posts and delete them
   */
  useEffect(() => {
    async function deleteExpired() { await fetch(`api/notes/deletion`) }
    deleteExpired()
  }, [])

  if (initialised) {
    if (windowWidth > 1200) {
      return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div ref={desktopComp} style={{ marginTop: "80px", width: "1200px", zoom: "0.72" }}>
            <WelcomeComp user={user} filter={filter} setFilter={setFilter} deviceSize={"DESKTOP"} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "29%" }}>
                <FilterComp filter={filter} lastFilterFromServer={lastFilterFromServer} setFilter={setFilter} updateFilter={updateFilter} deleteFilter={deleteFilter} filterUpdating={filterUpdating} notes={notes} deviceSize={"DESKTOP"} />
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
        <>
          <div style={{ zoom: "0.8" }}>
            <WelcomeComp user={user} filter={filter} setFilter={setFilter} deviceSize={"MOBILE"} />
          </div>
          <div style={{ borderRadius: "16px", backgroundColor: "rgb(241, 241, 241)", padding: "4px" }}>
            <ListingEditToggle mobileView={mobileView} setMobileView={setMobileView} />
            {mobileView === "FILTERS" && (
              <FilterComp filter={filter} lastFilterFromServer={lastFilterFromServer} setFilter={setFilter} updateFilter={updateFilter} deleteFilter={deleteFilter} filterUpdating={filterUpdating} notes={notes} deviceSize={"MOBILE"} />
            )}
            {mobileView === "NOTES" && (
              <ListingComp notes={notes} rendering={rendering} unlimitedNotes={unlimitedNotes} skipping={skipping} setSkipping={setSkipping} getSkippedNotes={getSkippedNotes} deviceSize={"MOBILE"} />
            )}
          </div>
        </>
      )
    }
  } else {
    <div></div>
  }




}

export default Index;