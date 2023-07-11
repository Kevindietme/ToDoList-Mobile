import { useState } from 'react'
import { Input, Button, HStack } from 'native-base'

export default function TodoHeader({ setTodoItems, user }) {

    const [newItem, setNewItem] = useState('')

    const addNewItem = () => {
        if(!newItem.length < 3) return
        const newTodoItem = {
            uid: user.uid,
            title: newItem,
        }
        fetch(`https://chekov-api-kd.web.app/tasks/${user.uid}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newTodoItem),
        })
        .then(res => res.json())
        .then(setTodoItems)
        .catch(alert)

        .finally(() => setNewItem('')) //clear input box 
    }


    return (
        <HStack space={2}>
            <Input value={newItem} onChangeText={setNewItem} size="lg" color="coolGray.200" flex={1} />
                <Button onPress={addNewItem}>Add</Button>        
        </HStack>
    )
}