const DEMO_REQUESTS_API =
"https://carecliq-redesign.onrender.com/api/demo-requests";


function escapeDemoHTML(value){

    return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


async function loadDemoRequests(){

    const container =
    document.getElementById(
        "demoRequestsList"
    );

    if(!container){

        return;

    }


    container.innerHTML =
    "<p>Loading demo requests...</p>";


    try{

        const response =
        await fetch(
            DEMO_REQUESTS_API
        );


        if(!response.ok){

            throw new Error(
                "Could not load requests"
            );

        }


        const requests =
        await response.json();


        if(
            !Array.isArray(requests)
            ||
            requests.length === 0
        ){

            container.innerHTML =
            "<p>No demo requests yet.</p>";

            return;

        }


        container.innerHTML =
        requests.map(request => {


            const id =
            escapeDemoHTML(request.id);


            const fullName =
            escapeDemoHTML(
                request.fullName
                ||
                "Unnamed client"
            );


            const email =
            escapeDemoHTML(
                request.email
                ||
                "Not provided"
            );


            const phone =
            escapeDemoHTML(
                request.phone
                ||
                "Not provided"
            );


            const organisation =
            escapeDemoHTML(
                request.organisation
                ||
                "Not provided"
            );


            const clientType =
            escapeDemoHTML(
                request.clientType
                ||
                "Not provided"
            );


            const message =
            escapeDemoHTML(
                request.message
                ||
                "No message"
            );


            const status =
            escapeDemoHTML(
                request.status
                ||
                "new"
            );


            const createdAt =
            request.createdAt
            ?
            new Date(
                request.createdAt
            ).toLocaleString()
            :
            "No date";


            const defaultSubject =
            escapeDemoHTML(
                `Your CareCliQ demo request`
            );


            const previousReplies =
            Array.isArray(request.replies)
            ?
            request.replies
            :
            [];


            const replyHistory =
            previousReplies.length
            ?
            `
            <div class="demo-reply-history">

                <h4>Reply history</h4>

                ${previousReplies.map(reply => `

                    <div class="demo-reply-history-item">

                        <strong>
                            ${escapeDemoHTML(
                                reply.subject
                            )}
                        </strong>

                        <p>
                            ${escapeDemoHTML(
                                reply.message
                            )}
                        </p>

                        <small>
                            ${reply.sentAt
                                ?
                                new Date(
                                    reply.sentAt
                                ).toLocaleString()
                                :
                                ""}
                        </small>

                    </div>

                `).join("")}

            </div>
            `
            :
            "";


            return `

            <article class="demo-request-card">

                <div class="demo-request-heading">

                    <div>

                        <h3>${fullName}</h3>

                        <span class="demo-request-status">
                            ${status}
                        </span>

                    </div>

                    <small>
                        ${escapeDemoHTML(createdAt)}
                    </small>

                </div>


                <div class="demo-request-details">

                    <p>
                        <strong>Client type:</strong>
                        ${clientType}
                    </p>

                    <p>
                        <strong>Organisation:</strong>
                        ${organisation}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${email}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${phone}
                    </p>

                    <p>
                        <strong>Client message:</strong>
                        ${message}
                    </p>

                </div>


                <button
                    type="button"
                    class="open-demo-reply-btn"
                    onclick="toggleDemoReply('${id}')"
                >
                    Reply from CareCliQ Email
                </button>


                <div
                    class="demo-reply-panel"
                    id="demoReplyPanel-${id}"
                >

                    <p class="reply-recipient">

                        Replying to:

                        <strong>
                            ${email}
                        </strong>

                    </p>


                    <label
                        for="demoReplySubject-${id}"
                    >
                        Email subject
                    </label>

                    <input
                        type="text"
                        id="demoReplySubject-${id}"
                        value="${defaultSubject}"
                    >


                    <label
                        for="demoReplyMessage-${id}"
                    >
                        Reply message
                    </label>

                    <textarea
                        id="demoReplyMessage-${id}"
                        placeholder="Write your reply to ${fullName}..."
                    ></textarea>


                    <button
                        type="button"
                        class="send-demo-reply-btn"
                        id="sendDemoReplyBtn-${id}"
                        onclick="sendDemoReply('${id}')"
                    >
                        Send Reply
                    </button>


                    <p
                        class="demo-reply-status"
                        id="demoReplyStatus-${id}"
                    ></p>

                </div>


                ${replyHistory}

            </article>

            `;

        }).join("");


    }
    catch(error){

        console.error(
            "Could not load demo requests:",
            error
        );


        container.innerHTML =
        "<p>Could not load demo requests.</p>";

    }

}



function toggleDemoReply(id){

    const panel =
    document.getElementById(
        `demoReplyPanel-${id}`
    );

    if(!panel){

        return;

    }


    panel.classList.toggle(
        "active"
    );

}



async function sendDemoReply(id){

    const subjectInput =
    document.getElementById(
        `demoReplySubject-${id}`
    );

    const messageInput =
    document.getElementById(
        `demoReplyMessage-${id}`
    );

    const sendButton =
    document.getElementById(
        `sendDemoReplyBtn-${id}`
    );

    const status =
    document.getElementById(
        `demoReplyStatus-${id}`
    );


    const subject =
    subjectInput.value.trim();


    const message =
    messageInput.value.trim();


    if(!subject || !message){

        status.textContent =
        "Enter the email subject and reply message.";

        return;

    }


    sendButton.disabled = true;

    sendButton.textContent =
    "Sending...";

    status.textContent = "";


    try{

        const response =
        await fetch(

            `${DEMO_REQUESTS_API}/${id}/reply`,

            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },

                body:
                JSON.stringify({

                    subject:
                    subject,

                    message:
                    message

                })

            }

        );


        const result =
        await response.json();


        if(!response.ok){

            throw new Error(
                result.message
                ||
                "Reply failed"
            );

        }


        status.textContent =
        result.message
        ||
        "Reply sent successfully.";


        messageInput.value = "";


        setTimeout(()=>{

            loadDemoRequests();

        }, 800);


    }
    catch(error){

        console.error(
            "Reply failed:",
            error
        );


        status.textContent =
        error.message
        ||
        "The reply could not be sent.";

    }
    finally{

        sendButton.disabled = false;

        sendButton.textContent =
        "Send Reply";

    }

}


window.loadDemoRequests =
loadDemoRequests;

window.toggleDemoReply =
toggleDemoReply;

window.sendDemoReply =
sendDemoReply;