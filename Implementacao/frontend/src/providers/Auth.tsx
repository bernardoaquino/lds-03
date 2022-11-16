import { createContext, ReactNode, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";

/** Constants */
import { SIGNIN_URL } from "../constants";

/** Types */
import KeyValuePair from "../types/KeyValuePair";

type AuthProviderProps = {
    children: ReactNode;
};

type SessionContext = {
    session: Session;
    updateSession: (session: Session) => void;
}

type Session = {
    name: string;
    data: Object;
    token: string;
    authHeaders?: KeyValuePair<string>;
    userType?: 'business' | 'student' | 'institution' | 'professor';
};

const DEFAULT_SESSION = {
    name: '',
    data: {},
    token: '',
    userType: undefined,
    authHeaders: {
        'Content-Type': 'application/json',
    },
};

const getDefaultSession = () => {
    const localStorageSession = localStorage.getItem('session');

    if (localStorageSession) {
        return JSON.parse(localStorageSession);
    }

    return DEFAULT_SESSION;
}

const AuthContext = createContext<SessionContext>({
    session: DEFAULT_SESSION,
    updateSession: (updatedSession: Session) => {
        const headersToAppend: KeyValuePair<string> = updatedSession?.token ? {
            'Authorization': updatedSession.token
        } : {};

        return ({ 
            ...DEFAULT_SESSION, 
            ...updatedSession, 
            authHeaders: {
                ...DEFAULT_SESSION.authHeaders,
                ...headersToAppend
            }
        })
    },
});

export const useSession = () => useContext(AuthContext);

export const AuthProvider = ({
    children
}: AuthProviderProps) => {
    const [session, setSession] = useState<Session>(getDefaultSession());

    const updateSession = (session: Session) => setSession((prevSession: Session) => {
        const headersToAppend: KeyValuePair<string> = session?.token ? {
            'Authorization': `Bearer ${session.token}`
        } : {};

        localStorage.removeItem('session');

        const newSession: Session = {
            ...prevSession,
            ...session,
            authHeaders: {
                ...prevSession.authHeaders,
                ...headersToAppend,
                ...DEFAULT_SESSION.authHeaders
            }
        };

        localStorage.setItem('session', JSON.stringify(newSession));

        return newSession;
    })

    return (
        <AuthContext.Provider value={{ session, updateSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthWall = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();
    const { session } = useSession();

    if (!session.token) {
        navigate(SIGNIN_URL);

        return null;
    }

    return children;
}