import './style/side-bar.css'
import { FileSpreadsheet } from 'lucide-react';

export default function SideBar() {
    return (
        <div className="SideBar">
            <div className='SideBar-section'>
                <h1>Lists and Sheets</h1>
                <button>Draft Sheets</button>
                <button>To Do Lists</button>
                <button>Notes</button>
            </div>
            <div className='SideBar-section'>
                <h1>Planner</h1>
                <button>Calendar</button>
                <button>Goals</button>
            </div>
            <div className='SideBar-section'>
                <h1>Tools</h1>
                <button>Daily Focus</button>
                <button>Archive</button>
            </div>
            
        </div>
    )
}