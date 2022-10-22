import { useUser } from '@auth0/nextjs-auth0';
import ListingCardRight from './ListingCardRight';
import ListingCardLeft from './ListingCardLeft';
import Link from 'next/link';

const ListingCard = ({ note }) => {

    const { user, error, isLoading } = useUser()


    /**
     * If not signed in => sign in
     * If signed in => go to details and comments
     */
    const handleCardRoute = () => {
        if (user) {
            return `/${note._id}`
        } else {
            return "/api/auth/login"
        }
    }


    return (
        <Link href={handleCardRoute()}>
            <div
                key={note._id}
                style={{ height: "100%", width: "100%", backgroundColor: "white", marginTop: "24px", borderRadius: "8px", border: "1px solid grey", overflow: "hidden" }}
            >

                {/* Content: Tags, Details */}
                <ListingCardLeft note={note} user={user} />

                {/* Scrolling Imgs Background */}
                <ListingCardRight note={note} />

                {/* If is your listing */}
                {user && user.sub === note.breakerId && <div className='note-mine'>🌱 🏡 Your Listing </div>}

            </div>
        </Link>
    )
}

export default ListingCard;