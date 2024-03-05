import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";  

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
            <h1 className="font-semibold text-xl">{title} List</h1>
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
                            <TableCell colSpan={2} className="text-center">No <span className="italic">`{title}`</span> tasks</TableCell>
                        </TableRow>
                    ) :(
                    tasks.map((task: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{task.taskName}</TableCell>
                            <TableCell className="flex gap-2">
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
                                {/* Be able remove todo once completed */}
                                {task.status === 'done' && (
                                    <AlertDialog>
                                        <AlertDialogTrigger className="text-red-500">Remove</AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                This action cannot be undone. This will remove your task from the list.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => updateStatus(task, 'delete')} className="bg-red-700 hover:bg-red-700/80">Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                  </AlertDialog>
                                )}
                            </TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>
        </div>
    );
}