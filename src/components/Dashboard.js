import React from 'react'

const Dashboard = props => (
	<div>
	<button onClick={props.handleLogout}>Logout</button>
		<h3>Here are Your Todos</h3>
		{
			props.todos.map(todo => ( 
				<p key={todo.id}>
				<span onClick={() => props.handleRemove(todo.id)}>X</span>
				&nbsp;
				{todo.text}
				</p>
			))
		}
		<form onSubmit={props.handleSubmit}>
			<input 
			name="text" 
			value={props.text} 
			onChange={props.handleChange}
			/>
			<button>Add Todo</button>
		</form>
	</div>
)


export default Dashboard