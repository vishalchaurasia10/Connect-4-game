'use client'
import { useEffect, useRef, useState } from "react";
import AuthContext from "./authContext";
import { toast, Toaster } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

const AuthState = (props) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    // WebSocket connection state
    const [socket, setSocket] = useState(null);
    const [index, setIndex] = useState(0);
    const [allowPlayersToEnter, setAllowPlayersToEnter] = useState(false);
    const [scoreboard, setScoreboard] = useState([]);
    const [testBoard, setTestBoard] = useState([]);
    const [actualBoard, setActualBoard] = useState([]);
    const [testMatchResult, setTestMatchResult] = useState(null);
    const [actualMatchResult, setActualMatchResult] = useState(null);
    const [matchType, setMatchType] = useState(null);
    const [onGoingMatch, setOnGoingMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const indexRef = useRef(index);

    const establishWebSocketConnection = (credentials) => {
        return new Promise(async (resolve) => {
            const ws = new WebSocket("wss://connect4-backend.onrender.com"); // Replace with your WebSocket server address

            ws.addEventListener("open", () => {
                console.log("WebSocket connection established");
                setSocket(ws); // Set the socket state once the connection is established
                resolve(); // Resolve the promise to signal that the WebSocket is open
            });

            ws.addEventListener("message", async (event) => {
                const resData = JSON.parse(event.data);
                console.log("WebSocket message received", resData);
                if (resData.reason === "/onAllowPlayersToEnter") {
                    setAllowPlayersToEnter(true);
                }
                if (resData.reason === "/onGameEnd") {
                    setScoreboard(resData.scoreboard);
                    setLoading(false)
                }
                if (resData.reason === "/onClientConnected") {
                    const newIndex = resData.index;
                    indexRef.current = newIndex; // Update the ref with the latest index
                    setIndex(newIndex); // Update the state with the latest index
                    console.log("New index received", newIndex);
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ ...credentials, index: newIndex }),
                    });

                    const data = await response.json();
                    console.log(data);

                    if (response.status === 200) {
                        setUser({
                            name: credentials.name,
                            email: credentials.email,
                        });
                        if (data.allowPlayersToEnter === true) {
                            setAllowPlayersToEnter(true);
                        }
                        setIndex(data.index)
                        toast.success("Registered successfully");
                        router.push("/");
                    } else {
                        toast.error("Registration failed");
                    }
                    resolve(newIndex);
                }
                if (resData.reason === "/onMakeTestMove") {
                    setTestBoard(resData.state);
                }
                if (resData.reason === "/onEndTestMatch") {
                    setTestMatchResult(resData)
                }
                if (resData.reason === "/onMakeMove") {
                    setLoading(true)
                }
                if (resData.reason === "/onMakeMove") {
                    setActualBoard(resData.state)
                }
                if (resData.reason === "/onMatchEnd") {
                    setActualMatchResult(resData)
                    setMatchType('actual')
                }
                if (resData.reason === "/onMatchStart") {
                    setMatchType('match')
                    setOnGoingMatch(resData)
                }
            });
        });
    };

    const register = async (credentials) => {

        try {
            await establishWebSocketConnection(credentials); // Wait for the WebSocket connection and get the new index
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (!user && pathname !== "/admin") {
            router.push("/auth");
        }
    }, [pathname]);

    return (
        <>
            <Toaster />
            <AuthContext.Provider
                value={{
                    user,
                    setUser,
                    register,
                    socket, // Pass the WebSocket connection through the context
                    allowPlayersToEnter,
                    scoreboard,
                    index,
                    testBoard,
                    setTestBoard,
                    testMatchResult,
                    setTestMatchResult,
                    loading,
                    actualBoard,
                    setActualBoard,
                    actualMatchResult,
                    matchType,
                    onGoingMatch,
                }}
            >
                {props.children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthState;
