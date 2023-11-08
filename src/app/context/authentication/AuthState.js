'use client'
import { useEffect, useState } from "react";
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

    const establishWebSocketConnection = () => {
        return new Promise((resolve) => {
            const ws = new WebSocket("ws://localhost:3001"); // Replace with your WebSocket server address

            ws.addEventListener("open", () => {
                console.log("WebSocket connection established");
                setSocket(ws); // Set the socket state once the connection is established
                resolve(); // Resolve the promise to signal that the WebSocket is open
            });

            ws.addEventListener("message", (event) => {
                const data = JSON.parse(event.data);
                console.log("WebSocket message received", data);
                if (data.reason === "/onAllowPlayersToEnter") {
                    setAllowPlayersToEnter(true);
                }
                if (data.reason === "/onGameStart" || data.reason === "/onGameEnd") {
                    setScoreboard(data.scoreboard);
                }
                setIndex(data.index);
            });
        });
    };

    const register = async (credentials) => {
        console.log("register", credentials);

        try {
            await establishWebSocketConnection(); // Wait for the WebSocket connection

            const response = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...credentials, index }),
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
                }}
            >
                {props.children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthState;
