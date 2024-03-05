"use client";

import { useEffect, useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

import { z } from "zod"
import { Button } from "@/components/ui/button";
import { TodoTable } from "@/components/table/todo-table";
 
const formSchema = z.object({
    taskName: z.string().min(2).max(50),
    status: z.enum(["todo", "in-progress", "done"]),
})

const TasksPage = () => {
    const [tasks, setTasks] = useState<any>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            taskName: "",
            status: "todo",
        },
    })

    function updateTask (task:any) {
        const oldTasks = tasks;
        const tempTask = task;

        if (tempTask.status === 'delete') {
            const newTasks = oldTasks.filter((item:any) => item.taskName !== tempTask.taskName);
            setTasks(newTasks);
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return;
        }

        const newTasks = oldTasks.map((item:any) => {
            if (item.taskName === tempTask.taskName) {
                return tempTask;
            } else {
                return item;
            }
        });

        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Check localStorage first for stored tasks
            const tasks = localStorage.getItem('tasks');

            // If task is found in localStorage, set it to state, otherwise create a new empty array
            if (tasks) {
                return setTasks(JSON.parse(tasks));
            } else {
                return localStorage.setItem('tasks', JSON.stringify([]));
            }
        }
    }, []);

    function onSubmit(values: z.infer<typeof formSchema>) {
        setTasks([...tasks, { ...values, status: "todo" }]);
        localStorage.setItem('tasks', JSON.stringify([...tasks, { ...values, status: "todo" }]));
        form.reset();
    }

    return (
        <div className="flex-1">
            <h1 className="text-3xl font-bold">Tasks</h1>
            <Form {...form}>
                <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-4 w-96 flex flex-col mx-auto">
                    <FormField
                        control={form.control}
                        name="taskName"
                        disabled={form.formState.isSubmitting}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Task Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Clean windows..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" variant="primary" disabled={!form.formState.isValid || form.formState.isSubmitting}>Submit</Button>
                </form>
            </Form>
            {tasks && tasks.length === 0 ? (
                <div className="flex w-full justify-center py-4">
                    <h1 className="text-xl font-bold">No tasks, please add a task</h1>
                </div>
            ) : (
                <div className="grid md:grid-cols-1 gap-4 lg:grid-cols-3 grid-cols-1">
                    <TodoTable tasks={tasks.filter((item:any) => item.status === 'todo')} setTask={updateTask} title="Todo" />
                    <TodoTable tasks={tasks.filter((item:any) => item.status === 'in-progress')} setTask={updateTask} title="In Progress" />
                    <TodoTable tasks={tasks.filter((item:any) => item.status === 'done')} setTask={updateTask} title="Completed"  />
                </div>
            
            )}
        </div>
    );
}

export default TasksPage;