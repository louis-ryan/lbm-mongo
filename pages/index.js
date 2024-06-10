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
   * Assign new min and max rent values to rent range if they were left at previous min and max
   */
  useEffect(() => {
    setFilter({
      ...filter,
      maxRentVal: filter.maxLimit ? rentProps[7] : filter.maxRentVal,
      minRentVal: filter.minLimit ? rentProps[6] : filter.minRentVal,
      selectedRentVal: [
        filter.minLimit ? rentProps[6] : filter.selectedRentVal[0],
        filter.maxLimit ? rentProps[7] : filter.selectedRentVal[1]
      ]
    })

  }, [lastFilterFromServer])



  /**
   * Check for expired posts and delete them
   */
  useEffect(() => {
    async function deleteExpired() { await fetch(`api/notes/deletion`) }
    deleteExpired()
  }, [])


  /**
   * Get rid of the unncessary chars from route when auth with facebook
   */
  useEffect(() => {
    if (window.location.hash === '#_=_') {
      history.replaceState
        ? history.replaceState(null, null, window.location.href.split('#')[0])
        : window.location.hash = '';
    }
  }, [])


  if (initialised) {
    if (windowWidth > 800 || windowWidth === null) {
      return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div ref={desktopComp} style={{ marginTop: "80px", width: "920px" }}>

            <WelcomeComp user={user} filter={filter} setFilter={setFilter} deviceSize={"DESKTOP"} nameChange={props.nameChange} setNameChange={props.setNameChange} paymentStatus={props.paymentStatus} />

            <div style={{ width: "100%", height: "1px", backgroundColor: "rgb(181, 181, 181)", marginTop: "40px" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "280px", opacity: !rentProps[6] && "0", transitionDuration: "500ms", transitionDelay: "1s" }}>
                <FilterComp filter={filter} lastFilterFromServer={lastFilterFromServer} setFilter={setFilter} updateFilter={updateFilter} deleteFilter={deleteFilter} filterUpdating={filterUpdating} notes={notes} rentProps={rentProps} deviceSize={"DESKTOP"} />
              </div>
              <div style={{ width: "calc(100% - 288px)" }}>
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

          <WelcomeComp user={user} filter={filter} setFilter={setFilter} deviceSize={"MOBILE"} nameChange={props.nameChange} setNameChange={props.setNameChange} />

          <div style={{ borderRadius: "16px", padding: "4px" }}>
            <ListingEditToggle mobileView={mobileView} setMobileView={setMobileView} />
            {mobileView === "FILTERS" && (
              <FilterComp filter={filter} lastFilterFromServer={lastFilterFromServer} setFilter={setFilter} updateFilter={updateFilter} deleteFilter={deleteFilter} filterUpdating={filterUpdating} notes={notes} rentProps={rentProps} deviceSize={"MOBILE"} />
            )}
            {mobileView === "NOTES" && (
              <ListingComp notes={notes} rendering={rendering} unlimitedNotes={unlimitedNotes} skipping={skipping} setSkipping={setSkipping} getSkippedNotes={getSkippedNotes} deviceSize={"MOBILE"} />
            )}
          </div>

          <div 
          onClick={() => router.push('/new')}
          className='button secondary' style={{position: "fixed", zIndex: "5", bottom: "0px", width: "calc(100% - 16px)", margin: "8px"}}
          >
              {"+ CREATE LISTING"}
          </div>
        </>
      )
    }
  } else {
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      LOADING...
    </div>
  }
}

export default Index;