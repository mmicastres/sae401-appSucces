import { Button, Dialog, IconButton, Select, Spacer, TextField } from "actify";
import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export function CreateConv({ open, setOpen, friends }) {
    const [selected, setSelected] = useState([]);
    const [title, setTitle] = useState("");

    const handleClick = () => {
        console.log(selected)
        console.log(title)
        axios.post(process.env.REACT_APP_API_URL + "/api/conv", {
            titre: title,
            participants: selected.map((friend) => friend.value)
        }).then((response) => {
            console.log(response.data)
            window.location.reload();
        })
    }

    return <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Content>
            <Dialog.Heading>
                <p>This dialog opened by out anchor</p>
                <Spacer />
                <Dialog.Close>
                    <IconButton color="secondary">
                        <X />
                    </IconButton>
                </Dialog.Close>
            </Dialog.Heading>
            <Dialog.Description>
                <TextField value={title} onChange={(e) => {
                    if (!e || !e.target) return
                    setTitle(e.target.value)
                }} variant={"outlined"} placeholder={"Title"} />
                <Select value={selected} onChange={(select) => {
                    setSelected(select);
                    console.log(selected)
                }} multiple={true} >
                    {friends.map((friend) => {
                        return <Select.Option value={friend.id}>{friend.pseudo}</Select.Option>
                    })}
                </Select>
            </Dialog.Description>
            <div className="flex items-center gap-2">
                <Spacer />

                <Dialog.Close>
                    <Button color="error">Cancel</Button>
                    <Button onClick={handleClick}>Confirm</Button>
                </Dialog.Close>
            </div>
        </Dialog.Content>
    </Dialog>
}