import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import { deleteEvent, fetchEvent, queryClient } from "../../util/http.js";
import Header from "../Header.jsx";
import ErrorBlock from "./../UI/ErrorBlock";
import Modal from "./../UI/Modal";

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const params = useParams();
  const naviate = useNavigate();
  // Data and State Handling
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  const { mutate, isPending:isPendingDeletion,isError:isErrorDeleting,error:deleteError } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      naviate("/events");
    },
  });

  // FNS
  const handleStartDelete = () => {
    setIsDeleting(true);
  };
  const handleStopDelete = () => {
    setIsDeleting(false);
  };
  const deleteHandler = () => {
    mutate({ id: params.id });
  };
  let content;
  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>fetching Data ...</p>
      </div>
    );
  }
  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to load Event"
          message={error.info?.message || "Failed to fetch data "}
        />
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you Sure ?</h2>
          <p>
            Do you really want to delete this event? This action cannot be
            undone
          </p>
          <div className="form-actions">
            {isPendingDeletion && <p>Deleting , please Wait </p>}
            {
              !isPendingDeletion && <>
            <button className="button-text" onClick={handleStopDelete}>
              Cancel
            </button>
            <button className="button" onClick={deleteHandler}>
              Delete
            </button>
              </>
            }
           {isErrorDeleting && <ErrorBlock title="Failed to Delete Event " message={deleteError.info?.message || "Failed to delete event"}/>}
          </div>
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
