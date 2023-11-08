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
    const [testBoard2, setTestBoard2] = useState([]);
    const indexRef = useRef(index);

    const establishWebSocketConnection = (credentials) => {
        return new Promise(async (resolve) => {
            const ws = new WebSocket("ws://localhost:3001"); // Replace with your WebSocket server address

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
                if (resData.reason === "/onGameStart" || resData.reason === "/onGameEnd") {
                    setScoreboard(resData.scoreboard);
                }
                if (resData.reason === "/onClientConnected") {
                    const newIndex = resData.index;
                    indexRef.current = newIndex; // Update the ref with the latest index
                    setIndex(newIndex); // Update the state with the latest index
                    const response = await fetch("http://localhost:3001/register", {
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
                        toast.success("Registered successfully");
                        router.push("/");
                    } else {
                        toast.error("Registration failed");
                    }
                    resolve(newIndex);
                }
                if (resData.reason === "/onMakeTestMove") {
                    setTestBoard2(resData.state);
                }
            });
        });
    };

    useEffect(() => {
        console.log(testBoard2);
        function replaceValuesInArray(originalArray) {
            const mapping = {
                1: 'X',
                2: 'O',
                0: '',
            };

            const newArray = originalArray.map((row) =>
                row.map((value) => mapping[value] || value)
            );

            return newArray;
        }

        setTestBoard(replaceValuesInArray(testBoard2));
    }, [testBoard2]);

    useEffect(() => {
        console.log(testBoard);
    }, [testBoard]);

    const register = async (credentials) => {
        console.log("register", credentials);

        try {
            await establishWebSocketConnection(credentials); // Wait for the WebSocket connection and get the new index
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (!user) {
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
                }}
            >
                {props.children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthState;
