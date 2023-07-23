import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import ListingCardRight from './ListingCardRight';
import ListingCardLeft from './ListingCardLeft';

const ListingCard = ({ note, rendering, deviceSize }) => {

    const { user } = useUser()

    const router = useRouter()

    
    const handleCardRoute = () => {
        if (user) {
            router.push(`/${note._id}`)
        } else {
            localStorage.setItem("redirect_to", `/${note._id}`)
            router.push("/api/auth/login")
        }
    }


    return (
        <div
            key={note._id}
            className="card"
            onClick={() => handleCardRoute()}
            style={{
                opacity: rendering && "0.5",
                filter: rendering && "brightness(0) invert(1)",
                transition: "opacity 500ms"
            }}
        >

            {/* Content: Tags, Details */}
            <ListingCardLeft note={note} deviceSize={deviceSize} />

            {/* Scrolling Imgs Background */}
            <ListingCardRight note={note} />

            {/* If is your listing */}
            {user && user.sub === note.breakerId && <div className='note-mine'>🌱 🏡 Your Listing </div>}

        </div>
    )
}

export default ListingCard;