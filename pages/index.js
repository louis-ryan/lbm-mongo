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
import useRentHandler from '../custom_hooks/useRentHandler';


const Index = (props) => {

  const windowWidth = useWindowWidth()
  const [mobileView, setMobileView] = useState("NOTES")
  const { user } = useUser()
  const router = useRouter()
  const desktopComp = useRef()
  const { lastFilterFromServer, setLastFilterFromServer, filter, setFilter } = useGetFilter(user)
  const { notes, unlimitedNotes, rendering, filterUpdating, setFilterUpdating, skipping, setSkipping, getSkippedNotes, initialised } = useGetFilteredNotes(filter)
  const { updateFilter, deleteFilter } = useUpdateFilter(user, router, setFilterUpdating, filter, setFilter, setLastFilterFromServer)
  const rentProps = useRentHandler(filter, setFilter, user)


  /**
   * Check for expired posts and delete them
   */
  useEffect(() => {
    async function deleteExpired() { await fetch(`api/notes/deletion`) }
    deleteExpired()
  }, [])


  if (initialised) {
    if (windowWidth > 800 || windowWidth === null) {
      return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div ref={desktopComp} style={{ marginTop: "80px", width: "1200px", zoom: "0.72" }}>
            <WelcomeComp user={user} filter={filter} setFilter={setFilter} deviceSize={"DESKTOP"} nameChange={props.nameChange} setNameChange={props.setNameChange} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "29%" }}>
                <FilterComp filter={filter} lastFilterFromServer={lastFilterFromServer} setFilter={setFilter} updateFilter={updateFilter} deleteFilter={deleteFilter} filterUpdating={filterUpdating} notes={notes} rentProps={rentProps} deviceSize={"DESKTOP"} />
              </div>
              <div style={{ width: "69%" }}>
                <ListingComp notes={notes} rendering={rendering} unlimitedNotes={unlimitedNotes} skipping={skipping} setSkipping={setSkipping} getSkippedNotes={getSkippedNotes} deviceSize={"DESKTOP"} />
              </div>
            </div>
          </div>
        </div >
      )
    }

    if (windowWidth <= 800) {
      return (
        <>
          <div style={{ zoom: "0.8" }}>
            <WelcomeComp user={user} filter={filter} setFilter={setFilter} deviceSize={"MOBILE"} nameChange={props.nameChange} setNameChange={props.setNameChange} />
          </div>
          <div style={{ borderRadius: "16px", backgroundColor: "rgb(241, 241, 241)", padding: "4px" }}>
            <ListingEditToggle mobileView={mobileView} setMobileView={setMobileView} />
            {mobileView === "FILTERS" && (
              <FilterComp filter={filter} lastFilterFromServer={lastFilterFromServer} setFilter={setFilter} updateFilter={updateFilter} deleteFilter={deleteFilter} filterUpdating={filterUpdating} notes={notes} rentProps={rentProps} deviceSize={"MOBILE"} />
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