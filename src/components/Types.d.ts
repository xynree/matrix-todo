import React from 'react'

type td3id = React.MutableRefObject<number>;
type setTasks = React.Dispatch<React.SetStateAction<any[]>>
type task =  {
    id: number;
    x: number;
    y: number;
    title: string;
    description: string;
    created: any;
    quadrant: number;
    editing: boolean;
}
type td3tasks = task[]
type hideShow = string;
type setHideShow = React.Dispatch<React.SetStateAction<string>>


interface setStorage  {
    (td3tasks:td3tasks, td3id: td3id, screenSize) : void;
}
interface editTask {
    (adjusted:task, setTasks:setTasks, hasClicked:any, td2tasks:td3tasks) : void
}

interface TypeProps {
    (task, td3tasks, setTasks, hideShow) : void
}