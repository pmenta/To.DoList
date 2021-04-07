import Todos from "./api/todos"

const apiTodos = new Todos()

import {createApp} from 'vue'


const app = createApp({
    data: () => ({
        todos: [],
        form: {
            text: '',
            done: false
        }
    }),

    async created() {
        this.fetchTodos()
    },


    methods: {
        async fetchTodos() {
            this.todos = await apiTodos.index()
            console.log(this.todos)
        },
        async createTodo() {

            if (this.form.text == '') {
                alert('Ops, algo deu errado!')
            }

            else {
                const data = await apiTodos.store(this.form)
                this.todos.push(data)
                this.form.text = ''
                this.form.done = false
            }

        },
        async toogleTodoStatus(todo) {
            const data = await apiTodos.update({
                ...todo,
                done: !todo.done
            })

            const index = this.todos.findIndex(({ id }) => id == data.id)

            this.todos[index] = data
        },

        async deleteTodo(id) {

            await apiTodos.delete({ id })

            const index = this.todos.findIndex((todo) => todo.id == id)
            this.todos.splice(index, 1)


        }
    }

    
})

app.mount('#app')

