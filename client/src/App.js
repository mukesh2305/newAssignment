import './App.css';
import { Input, Table } from "antd";
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodoItems, getAllTodoItems, updateEmailTodo } from './redux/actions/todo.action';
import { EditOutlined } from "@ant-design/icons";


function App() {
	const { resultPerPage, todos, todosCount, } = useSelector(state => state.getTodos.todos);
	const { loading } = useSelector(state => state.getTodos);


	// columns name for table
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			key: 'created at',
		},
		{
			title: 'Updated At',
			dataIndex: 'updatedAt',
			key: 'updated at',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			render: (text, record) => {
				return (
					<>
						<EditOutlined
							onClick={(e) => {
								onEditEmail(record);
							}}
						/>
					</>
				);
			},
		},
	];

	const [dataSource, setDataSource] = useState([]);
	// record we want to edit 
	const [recordEmail, setRecordEmail] = useState('');

	// for open or close model on the basis of condition
	const [isEditing, setIsEditing] = useState(false);
	// console.log("dataSource", dataSource)

	const dispatch = useDispatch();

	// for open or close model on the basis of condition
	const [visible, setVisible] = useState(false);

	// setting edit email 
	const [editEmail, setEditEmail] = useState(null);
	const [todo, setTodo] = useState({
		name: '',
		email: '',
	});
	const { name, email } = todo;

	// calculating current page number
	const [currentPage, setCurrentPage] = useState(1);



	// to check whether model is visible or not
	const setModelVisible = (inputValue) => {
		setVisible(inputValue);
	};

	// for creating new todo
	const createTodo = (e) => {

		setTodo({ ...todo, [e.target.name]: e.target.value });
	}

	// after creating new todo we pass to the api and redux to store and show in the table
	const submitTodo = () => {
		dispatch(createTodoItems(todo));
		setVisible(false);
	}

	// for updating email
	const editEmailValue = (e) => {
		setEditEmail(e.target.value);
	}

	// which row record we want to edit
	const onEditEmail = (record) => {
		setIsEditing(true);
		setRecordEmail({ record });
	};

	// after updating email we pass to the api and redux to store and show in the table
	const submitEditEmail = () => {
		// eslint-disable-next-line array-callback-return
		todos.map((todo) => {

			if (todo._id === recordEmail.record._id) {
				dispatch(updateEmailTodo(todo._id, editEmail));
			}
		})
		setIsEditing(false);
	}

	useEffect(() => {
		setDataSource(todos);
	}, [todos])

	useEffect(() => {
		dispatch(getAllTodoItems(currentPage));
	}, [dispatch, currentPage]);
	// setDatasource(todos);
	return (
		<div className='App'>

			{/* Create Section */}
			<Button onClick={() => setModelVisible(true)}>createTodo</Button>
			<Modal
				title="Vertically centered modal dialog"
				centered
				visible={visible}
				onOk={submitTodo}
				onCancel={() => setModelVisible(false)}
			>
				<Input name='name' value={name} type="text" placeholder='Name' onChange={createTodo} />
				<Input name='email' value={email} type="email" placeholder='Email' onChange={createTodo} />
			</Modal>

			{/* end of Create Section */}

			{/* Edit Section */}
			<Modal
				title="Edit Email"
				centered
				visible={isEditing}
				onOk={submitEditEmail}
				onCancel={() => setIsEditing(false)}
			>
				<Input name='email' value={editEmail} type="email" placeholder='Email' onChange={editEmailValue} />
			</Modal>
			{/* end of Edit Section */}

			<Table
				dataSource={dataSource}
				columns={columns}
				loading={loading}
				pagination={
					{
						pageSize: resultPerPage,
						total: todosCount,
						onChange: (page) => {
							setCurrentPage(page);
						}
					}
				}
			/>;

		</div>
	);
}

export default App;
