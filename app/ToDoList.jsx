import { useState, useEffect } from 'react'
import { Center, Box, VStack, HStack, Checkbox, Text } from "native-base"
import TodoHeader from './TodoHeader'


export default function ToDoList({ user }) { 
    
    const [todoItems, setTodoItems] = useState()

    useEffect(() => {
        if(user) {
            console.log("Getting at: " + `https://chekov-api-kd.web.app/tasks/${user.uid}`)
            fetch(`https://chekov-api-kd.web.app/tasks/${user.uid}`)
            .then(res => res.json())
            .then(setTodoItems)
            .catch(alert)
        }
    }, [user])
    
    const handleItemUpdate = (id, done) => {
        const itemUpdate = { id, done: !done}
        console.log(`https://chekov-api-kd.web.app/tasks/${user.uid}`)
        fetch(`https://chekov-api-kd.web.app/tasks/${user.uid}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(itemUpdate)
        })
        .then( res => res.json() )
        .then( data => {
            console.log(data)
            setTodoItems(data)
        })
        .catch(alert)
    }

    const handleItemDelete = (id) => {
        const itemDelete = { id }

        fetch(`https://chekov-api-kd.web.app/tasks/${user.uid}`, {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'
        },
        body: JSON.stringify(itemDelete)
    })      
            .then( res => res.json() )
            .then( data => {
            setTodoItems(data)
            })
            .catch(alert)
    }

    return (
    
    <Center w="100%">
        <Box maxW={300} w="100%">
            <VStack space={4} >
            <TodoHeader user={user} setTodoItems={setTodoItems} />
            {!todoItems 
                ? <Text fontSize="lg" color="coolGray.300" textAlign="center">Loading...</Text>
                : todoItems.map(item => {
                    const thisItemId = item.id 
                    const thisItemDone = item.done
                    return (
                    <HStack key={item.id} w="100%" justifyContent="space-between" alignItems="center">
                        <Checkbox aria-label={item.title} isChecked={item.done} onChange={ () => 
                            handleItemUpdate(thisItemId, thisItemDone)} />
                        <Text 
                        fontSize={18} 
                        onPress={ () => handleItemUpdate(thisItemId, thisItemDone) }
                        mx={2} 
                        strikeThrough={item.done}
                        color={item.done ? 'coolGray.500' : 'coolGray.100'}
                        textAlign="left"
                        width="50%"
                        >{item.title}</Text>
                        <Text onPress={() => handleItemDelete(thisItemId)} fontSize={18} mx={2} color={'coolGray.400'} textAlign="right">
                            🗑️
                
                        </Text>
                    </HStack>
  )})
}
            </VStack>
        </Box>
    </Center>
    )
}