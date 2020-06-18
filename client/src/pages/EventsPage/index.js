import React, { useState, useMemo, useEffect } from 'react'
import api from '../../services/api'
import {
  Button,
  Form,
  FormGroup,
  Input,
  Container,
  Label,
  Alert,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown,
} from 'reactstrap'
import cameraIcon from '../../assets/camera.png'
import './events.css'

//EventsPage wil show all the events
export default function EventsPage({ history }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [sport, setSport] = useState('Sport')
  const [date, setDate] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [dropdownOpen, setOpen] = useState(false)
  const user = localStorage.getItem('user')

  useEffect(() => {
    if (!user) history.push('/login')
  }, [])

  const toggle = () => setOpen(!dropdownOpen)

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  }, [thumbnail])

  const submitHandler = async (evt) => {
    const eventData = new FormData()

    eventData.append('thumbnail', thumbnail)
    eventData.append('sport', sport)
    eventData.append('title', title)
    eventData.append('price', price)
    eventData.append('description', description)
    eventData.append('date', date)

    try {
      if (
        title !== '' &&
        description !== '' &&
        price !== '' &&
        sport !== 'sport' &&
        date !== '' &&
        thumbnail !== null
      ) {
        await api.post('/event', eventData, { headers: { user } })
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          history.push('/')
        }, 2000)
      } else {
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 2000)
      }
    } catch (error) {
      Promise.reject(error)
      console.log(error)
    }

    evt.preventDefault()

    return ''
  }

  const sportEventHandler = (sport) => {
    setSport(sport)
  }

  return (
    <Container>
      <h1>Create your Event</h1>
      <Form onSubmit={submitHandler}>
        <div className="input-group">
          <FormGroup>
            <Label>Upload your image: </Label>
            <Label
              id="thumbnail"
              style={{ backgroundImage: `url(${preview})` }}
              className={thumbnail ? 'has thumbnail' : ''}
            >
              <Input
                type="file"
                onChange={(evt) => setThumbnail(evt.target.files[0])}
              />
              <img
                src={cameraIcon}
                style={{ maxWidth: '50px' }}
                alt="Upload icon"
              />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>title: </Label>
            <Input
              id="title"
              type="text"
              value={title}
              placeholder={'Event title'}
              onChange={(evt) => setTitle(evt.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description: </Label>
            <Input
              id="description"
              type="text"
              value={description}
              placeholder={'Description'}
              onChange={(evt) => setDescription(evt.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Price: </Label>
            <Input
              id="price"
              type="text"
              value={price}
              placeholder={'Event price $0.00'}
              onChange={(evt) => setPrice(evt.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Event date: </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(evt) => setDate(evt.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
              <Button id="caret" value={sport} disabled>
                {sport}
              </Button>
              <DropdownToggle caret />
              <DropdownMenu>
                <DropdownItem onClick={() => sportEventHandler('running')}>
                  Running
                </DropdownItem>
                <DropdownItem onClick={() => sportEventHandler('swimming')}>
                  Swimming
                </DropdownItem>
                <DropdownItem onClick={() => sportEventHandler('cycling')}>
                  Cycling
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </FormGroup>
        </div>
        <FormGroup>
          <Button className="submit-btn">Create event</Button>
        </FormGroup>

        <FormGroup>
          <Button className="secondary-btn" onClick={() => history.push('/')}>
            Cancel
          </Button>
        </FormGroup>
      </Form>
      {error ? (
        <Alert className="event-validation" color="danger">
          Missing required information
        </Alert>
      ) : (
        ''
      )}
      {success ? (
        <Alert className="event-validation" color="success">
          Your event has been created successfully!
        </Alert>
      ) : (
        ''
      )}
    </Container>
  )
}
