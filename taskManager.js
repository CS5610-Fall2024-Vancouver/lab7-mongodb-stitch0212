const { MongoClient } = require('mongodb');

// MongoDB Atlas connection URI
const uri = 'mongodb+srv://stitch0212:Kehan0212@cluster0.ojfdl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your actual MongoDB Atlas connection string

// Function to connect to MongoDB Atlas and insert multiple tasks
async function addTasks(tasksArray) {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Access the database and collection
        const database = client.db('taskManagerDB');
        const tasks = database.collection('tasks');

        // Insert the array of tasks into the collection
        const result = await tasks.insertMany(tasksArray);

        // Print the result of the insertion
        console.log(`${result.insertedCount} tasks inserted successfully`);
    } catch (err) {
        console.error('Error inserting tasks:', err);
    } finally {
        // Close the database connection
        await client.close();
    }
}

// Example: addTask function
/*
const tasksArray = [
     {
         title: 'Complete MongoDB CRUD activity',
         description: 'Write a Node.js script that performs CRUD operations in MongoDB Atlas',
         completed: false,
         dueDate: '2024-10-15'
     },
     {
         title: 'Submit MongoDB project',
         description: 'Submit the MongoDB project on the due date',
         completed: false,
         dueDate: '2024-10-20'
     }
 ];
 addTasks(tasksArray);
 */

// Function to retrieve all tasks
async function getAllTasks() {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Access the database and collection
        const database = client.db('taskManagerDB');
        const tasks = database.collection('tasks');

        // Find all tasks in the collection
        const allTasks = await tasks.find({}).toArray();

        // Print all tasks
        console.log('All tasks:');
        console.log(allTasks);
    } catch (err) {
        console.error('Error retrieving tasks:', err);
    } finally {
        // Close the database connection
        await client.close();
    }
}

// Example: getAllTasks function
// getAllTasks();

// Function to update a task by completion statys
async function updateTaskCompletionStatus(title, completed) {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Access the database and collection
        const database = client.db('taskManagerDB');
        const tasks = database.collection('tasks');

        // Update the completion status of the task
        const result = await tasks.updateOne(
            { title: title },
            { $set: { completed: completed } }
        );

        // Print the result of the update operation
        console.log(`Task '${title}' completion status updated successfully`);
    } catch (err) {
        console.error('Error updating task completion status:', err);
    } finally {
        // Close the database connection
        await client.close();
    }
}

// Example: updateTaskCompletionStatus function
// updateTaskCompletionStatus('"Complete MongoDB CRUD activity"', true);

// Function to delete a task by title
async function deleteTaskByTitle(title) {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Access the database and collection
        const database = client.db('taskManagerDB');
        const tasks = database.collection('tasks');

        // Delete the task by title
        const result = await tasks.deleteOne({ title: title });

        // Print the result of the deletion operation
        console.log(`Task '${title}' deleted successfully`);
    } catch (err) {
        console.error('Error deleting task:', err);
    } finally {
        // Close the database connection
        await client.close();
    }
}

// Example: deleteTaskByTitle function
// deleteTaskByTitle('"Submit MongoDB project"');

// Function to query and print tasks that are due in the future (based on dueDate)
async function getUpcomingTasks() {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Access the database and collection
        const database = client.db('taskManagerDB');
        const tasks = database.collection('tasks');

        // Find tasks with due dates greater than today
        const upcomingTasks = await tasks.find({ dueDate: { $gt: new Date().toISOString() } }).toArray();

        // Print upcoming tasks
        console.log('Upcoming tasks:');
        console.log(upcomingTasks);
    } catch (err) {
        console.error('Error retrieving upcoming tasks:', err);
    } finally {
        // Close the database connection
        await client.close();
    }
}

// Example: getUpcomingTasks function
getUpcomingTasks();
