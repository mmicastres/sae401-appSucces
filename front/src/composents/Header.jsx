import {List, ListItem, NavigationRail} from "actify";
import React, {useEffect, useState} from "react";
import {Camera, Home, MessageCircle, MessageCircleIcon, Settings, UserRound} from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function Header(){
    const navigate = useNavigate()
    const [user, setUser] = useState( JSON.parse(localStorage.getItem("user")))
    const [list,setList] = useState( [
            {
                label: 'Home',
                icon: <Home />,
                onClick:()=>{
                    navigate("/")
                }
            },
            {
                label: 'User',
                icon: <UserRound />,
                onClick:()=>{
                    navigate("/profile")
                }
            }
        ])

    useEffect(() => {
        if (user){
            setList([
                {
                    label: 'Home',
                    icon: <Home />,
                    onClick:()=>{
                        navigate("/")
                    }
                },
                {
                    label: 'Messages',
                    icon: <MessageCircleIcon />,
                    onClick:()=>{
                        navigate("/conv")
                    }
                },
                {
                    label: 'User',
                    icon: <UserRound />,
                    onClick:()=>{
                        navigate("/profile")
                    }
                },{
                label: 'Logout',
                icon: <Settings />,
                onClick:()=>{
                    navigate("/logout")
                }
            }])
        }
    }, []);

    return <NavigationRail className={"fixed h-full"}>
        <List className="py-3 w-full">
            {list.map((item, index) => (
                <ListItem  onClick={item.onClick} key={index} className="pl-0 py-2 flex flex-col text-primary">
                    {item.icon}
                    <span className="text-xs font-semibold mt-1">{item.label}</span>
                </ListItem>
            ))}
        </List>
    </NavigationRail>

}