import { useUser } from '@auth0/nextjs-auth0';
import ListingCardRight from './ListingCardRight';
import ListingCardLeft from './ListingCardLeft';
import Link from 'next/link';

const ListingCard = ({ note }) => {

    const { user, error, isLoading } = useUser()


    /**
     * If not signed in => sign in
     * If your card => go to edit
     * If someone else's card => go to details and comments
     */
    const handleCardRoute = () => {
        if (user) {
            if (user.sub === note.breakerId) {
                return `/${note._id}/edit`
            } else {
                return `/${note._id}`
            }
        } else {
            return "/api/auth/login"
        }
    }

    return (
        <Link href={handleCardRoute()}>
            <div
                key={note._id}
                className="note-container"
                style={{
                    border: user && user.sub === note.breakerId && "8px #586781 solid",
                    // outline: user && user.sub === note.breakerId && "0.5px white solid"
                }}
            >

                {/* Cointent: Tags, Details */}
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