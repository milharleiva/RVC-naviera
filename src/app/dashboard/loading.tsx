
import { Spinner } from 'reactstrap';

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Spinner style={{ width: '3rem', height: '3rem' }} />
            <p>Loading...</p>
        </div>
    );
}