import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

type Tasks = {
    id: number;
    taskName: string;
    status: string;
}

type TodoTableProps = {
    tasks: Tasks[];
    setTask: (tasks: Tasks[]) => void;
    title: string;
}

export const TodoTable = ({ tasks, setTask, title }: TodoTableProps) => {
    function updateStatus(task: any, status: string) {
        const tempTask = { ...task, status: status };

        setTask(tempTask);
    }

    return (
        <div className="p-4 border-2 border-gray-300 rounded-sm">
            <h1>{title} List</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={2} className="text-center">No tasks</TableCell>
                        </TableRow>
                    ) :(
                    tasks.map((task: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{task.taskName}</TableCell>
                            <TableCell>
                                <Select onValueChange={(e) => updateStatus(task, e)} defaultValue={task.status}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue defaultValue={task.status}/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todo">Todo</SelectItem>
                                        <SelectItem value="in-progress">In Progress</SelectItem>
                                        <SelectItem value="done">Done</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>
        </div>
    );
}