import './style/side-bar.css'
import { FileSpreadsheet, List, NotebookPen, CalendarDays, ScanEye, Goal, Archive} from 'lucide-react';

export default function SideBar() {
    return (
        <div className="sideBar">
            <div className='sideBar-content'>
                <div className='sideBar-section'>
                    <h1>Lists and Sheets</h1>
                    <button> <FileSpreadsheet/> Draft Sheets</button>
                    <button> <List/> To Do Lists</button>
                    <button> <NotebookPen/> Notes</button>
                </div>
                <div className='sideBar-section'>
                    <h1>Planner</h1>
                    <button> <CalendarDays/> Calendar</button>
                    <button> <Goal/> Goals</button>
                </div>
                <div className='sideBar-section'>
                    <h1>Tools</h1>
                    <button> <ScanEye/> Daily Focus</button>
                    <button> <Archive/> Archive</button>
                </div>
            </div>
            
        </div>
    )
}