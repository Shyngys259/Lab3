
'use strict';

const form = document.getElementById('habit-form');
const habitIdInput = document.getElementById('habit-id');
const nameInput = document.getElementById('habit-name');
const categoryInput = document.getElementById('habit-category');
const minutesInput = document.getElementById('habit-minutes');
const submitButton = document.getElementById('habit-submit');
const cancelButton = document.getElementById('habit-cancel');
const searchInput = document.getElementById('habit-search');
const filterInput = document.getElementById('habit-filter');
const habitList = document.getElementById('habit-list');
const emptyMessage = document.getElementById('habit-empty');
const message = document.getElementById('habit-message');
const totalOutput = document.getElementById('habit-total');
const completedOutput = document.getElementById('habit-completed');
const minutesOutput = document.getElementById('habit-total-minutes');



const STORAGE_KEY = 'digitalWellbeingHabits';

let habits = [];

try {
    const savedHabits = localStorage.getItem(STORAGE_KEY);

    if (savedHabits) {
        const parsedHabits = JSON.parse(savedHabits);

        if (Array.isArray(parsedHabits)) {
            habits = parsedHabits.filter(habit =>
                habit &&
                Number.isSafeInteger(habit.id) &&
                typeof habit.name === 'string' &&
                typeof habit.category === 'string' &&
                Number.isFinite(habit.minutes) &&
                habit.minutes >= 1 &&
                habit.minutes <= 1440 &&
                typeof habit.completed === 'boolean'
            );
        }
    }
} catch (error) {
    console.error('Could not load habits:', error);
    message.textContent = 'Saved data could not be loaded.';
}

// 3. Save habits in localStorage
function saveHabits() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
        return true;
    } catch (error) {
        console.error('Could not save habits:', error);
        message.textContent = 'Could not save data. Check browser storage.';
        return false;
    }
}


function showMessage(text) {
    message.textContent = text;
}


function resetForm() {
    form.reset();
    habitIdInput.value = '';
    submitButton.textContent = 'Add Habit';
    cancelButton.hidden = true;
}


function updateStats() {
    const completed = habits.filter(habit => habit.completed).length;

    const totalMinutes = habits.reduce(
        (sum, habit) => sum + habit.minutes,
        0
    );

    totalOutput.textContent = habits.length;
    completedOutput.textContent = completed;
    minutesOutput.textContent = totalMinutes;
}


function renderHabits() {
    habitList.replaceChildren();

    const searchText = searchInput.value.trim().toLowerCase();
    const filter = filterInput.value;

    const filteredHabits = habits.filter(habit => {
        const matchesSearch =
            habit.name.toLowerCase().includes(searchText) ||
            habit.category.toLowerCase().includes(searchText);

        const matchesFilter =
            filter === 'All' ||
            (filter === 'Completed' && habit.completed) ||
            (filter === 'Pending' && !habit.completed);

        return matchesSearch && matchesFilter;
    });

    emptyMessage.hidden = filteredHabits.length !== 0;

    if (habits.length === 0) {
        emptyMessage.textContent =
            'No habits yet. Add your first habit above!';
    } else if (filteredHabits.length === 0) {
        emptyMessage.textContent =
            'No habits match your search or filter.';
    }

    filteredHabits.forEach(habit => {
        const card = document.createElement('div');
        card.className = 'habit-item';

        const title = document.createElement('h4');
        title.textContent = habit.name;

        const details = document.createElement('p');
        details.textContent =
            'Category: ' + habit.category +
            ' | ' + habit.minutes + ' minutes per day';

        const status = document.createElement('p');
        status.textContent = habit.completed
            ? 'Status: Completed'
            : 'Status: Not completed';

        const completeButton = document.createElement('button');
        completeButton.type = 'button';
        completeButton.dataset.action = 'toggle';
        completeButton.dataset.id = habit.id;
        completeButton.textContent = habit.completed
            ? 'Mark as Not Completed'
            : 'Mark as Completed';

        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.dataset.action = 'edit';
        editButton.dataset.id = habit.id;
        editButton.textContent = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.dataset.action = 'delete';
        deleteButton.dataset.id = habit.id;
        deleteButton.textContent = 'Delete';

        card.append(title, details, status);
        card.append(completeButton, editButton, deleteButton);
        habitList.appendChild(card);
    });

    updateStats();
}


form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const category = categoryInput.value;
    const minutes = Number(minutesInput.value);
    const id = habitIdInput.value;

    if (name.length === 0) {
        showMessage('Please enter a habit name.');
        return;
    }

    if (
        !Number.isInteger(minutes) ||
        minutes < 1 ||
        minutes > 1440
    ) {
        showMessage('Enter a whole number from 1 to 1440.');
        return;
    }

    if (id !== '') {
        const habit = habits.find(item => item.id === Number(id));

        if (!habit) {
            showMessage('Habit not found. Please try again.');
            resetForm();
            return;
        }

        const oldHabit = { ...habit };

        habit.name = name;
        habit.category = category;
        habit.minutes = minutes;

        if (!saveHabits()) {
            Object.assign(habit, oldHabit);
            return;
        }

        showMessage('Habit updated successfully!');
    } else {
        const newHabit = {
            id: Date.now(),
            name: name,
            category: category,
            minutes: minutes,
            completed: false
        };

        // Avoid duplicate IDs if two habits are added very quickly.
        while (habits.some(item => item.id === newHabit.id)) {
            newHabit.id++;
        }

        habits.push(newHabit);

        if (!saveHabits()) {
            habits.pop();
            return;
        }

        showMessage('Habit added successfully!');
    }

    resetForm();
    renderHabits();
});

habitList.addEventListener('click', function (event) {
    const button = event.target.closest('button[data-action]');

    if (!button || !habitList.contains(button)) {
        return;
    }

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    const index = habits.findIndex(habit => habit.id === id);

    if (index === -1) {
        showMessage('Habit not found.');
        return;
    }

    const habit = habits[index];

    if (action === 'edit') {
        habitIdInput.value = habit.id;
        nameInput.value = habit.name;
        categoryInput.value = habit.category;
        minutesInput.value = habit.minutes;

        submitButton.textContent = 'Save Changes';
        cancelButton.hidden = false;

        showMessage('Edit the habit and click Save Changes.');
        nameInput.focus();
    }

    if (action === 'delete') {
        const confirmed = window.confirm(
            'Are you sure you want to delete this habit?'
        );

        if (!confirmed) {
            return;
        }

        const deletedHabit = habits.splice(index, 1)[0];

        if (!saveHabits()) {
            habits.splice(index, 0, deletedHabit);
            return;
        }

        if (habitIdInput.value === String(id)) {
            resetForm();
        }

        showMessage('Habit deleted successfully!');
        renderHabits();
    }

    if (action === 'toggle') {
        habit.completed = !habit.completed;

        if (!saveHabits()) {
            habit.completed = !habit.completed;
            return;
        }

        showMessage(
            habit.completed
                ? 'Habit marked as completed!'
                : 'Habit marked as not completed.'
        );

        renderHabits();
    }
});


cancelButton.addEventListener('click', function () {
    resetForm();
    showMessage('Editing cancelled.');
});


searchInput.addEventListener('input', renderHabits);
filterInput.addEventListener('change', renderHabits);


renderHabits();
