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

import trees from '../public/australian-trees.jpg';
import logo from '../public/lbm-logo.svg';


const Index = () => {

  const [loaded, setLoaded] = useState(false)

  const windowWidth = useWindowWidth()
  const [mobileView, setMobileView] = useState("NOTES")
  const { user } = useUser()
  const router = useRouter()
  const desktopComp = useRef()
  const { filter, setFilter } = useGetFilter(user)
  const unlimitedNotes = useGetUnlimitedNotes(filter)
  const { notes, rendering, filterUpdating, setFilterUpdating, skipping, setSkipping } = useGetFilteredNotes(filter)
  const { updateFilter } = useUpdateFilter(user, router, setFilterUpdating, filter, setFilter)


  /**
   * Handle redirections after auth0 login
   */
  useEffect(() => {
    if (!localStorage.getItem("redirect_to")) return
    const route = localStorage.getItem("redirect_to")
    window.location.replace(route)
    localStorage.removeItem("redirect_to")
  })


  /**
   * Check for expired posts and delete them
   */
  useEffect(() => {
    async function deleteExpired() { await fetch(`api/notes/deletion`) }
    deleteExpired()
  }, [])


  /**
   * Set loaded after time interval from mount
   */
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 2000)
  }, [])


  if (loaded) {
    if (windowWidth > 1200) {
      return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div ref={desktopComp} style={{ marginTop: "152px", width: "1200px", zoom: "0.8" }}>
            <div style={{ position: "absolute", width: "100%", top: "-420px", left: "0px", zIndex: "-1", height: "720px", overflow: "hidden", filter: "brightness(0.8)", opacity: "1" }}>
              <img
                width="1500"
                src={trees.src}
                style={{ width: "100%", marginTop: "120px" }}
              />
            </div>
            <div style={{ position: "absolute", top: "16px", left: "24px" }}>
              <img src={logo()}/>
            </div>
            <WelcomeComp user={user} filter={filter} setFilter={setFilter} deviceSize={"DESKTOP"} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "29%" }}>
                <FilterComp filter={filter} setFilter={setFilter} updateFilter={updateFilter} filterUpdating={filterUpdating} notes={notes} deviceSize={"DESKTOP"} />
              </div>
              <div style={{ width: "69%" }}>
                <ListingComp notes={notes} rendering={rendering} unlimitedNotes={unlimitedNotes} skipping={skipping} setSkipping={setSkipping} deviceSize={"DESKTOP"} />
              </div>
            </div>
          </div>
        </div >
      )
    } else {
      return (
        <div style={{ width: "100%" }}>
          <div style={{ zoom: "0.8" }}>
            <WelcomeComp user={user} filter={filter} setFilter={setFilter} deviceSize={"MOBILE"} />
          </div>
          <ListingEditToggle mobileView={mobileView} setMobileView={setMobileView} />
          {mobileView === "FILTERS" && (
            <FilterComp filter={filter} setFilter={setFilter} updateFilter={updateFilter} filterUpdating={filterUpdating} notes={notes} deviceSize={"MOBILE"} />
          )}
          {mobileView === "NOTES" && (
            <ListingComp notes={notes} rendering={rendering} unlimitedNotes={unlimitedNotes} skipping={skipping} setSkipping={setSkipping} deviceSize={"MOBILE"} />
          )}
        </div>
      )
    }
  } else {
    return (
      <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h1 style={{ color: "black" }}>loading...</h1>
      </div>
    )
  }

}

export default Index;