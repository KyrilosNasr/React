import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { fetchEvent, queryClient, updateEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";

export default function EditEvent() {
  const params = useParams();
  const submit = useSubmit();
  const { state } = useNavigation();
  const navigate = useNavigate();

  const { data, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    staleTime:10000
  });

  // const {mutate} = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate:async (data) => {
  //     const newEvent = data.event
  //     await queryClient.cancelQueries({ queryKey: ['events', params.id] })
  //     const previousEvent = queryClient.getQueryData(['events',params.id])
  //     queryClient.setQueryData(['events', params.id], newEvent)
  //     return {previousEvent}
  // },
  //   onError: (error , data, context ) => {
  //     queryClient.setQueryData(['events',params.id],context.previousEvent)
  //   },
  //    onSettled: () => {
  //     queryClient.invalidateQueries(['events',params.id])
  //    }
  // })

  function handleSubmit(formData) {
    submit(formData, {
      method: "PUT",
    });
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title={"Faild to Load Event"}
          message={error.info?.message || "Faild to Load Event data"}
        />
        <div className="form-actions">
          <Link to="../" className="button">
            {" "}
            Okay
          </Link>
        </div>
      </>
    );
  }
  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <p>Sending Data ...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }
  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function eventLoader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

export async function eventAction({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(["events"]);
  return redirect("../");
}
