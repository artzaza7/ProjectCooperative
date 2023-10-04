import React from "react";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import DatatablePage from "../component/Table";
function AllTranscation() {
    return (
        <><Nav />
            <div class="container-xl my-5">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <div className="Header">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">All</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Income</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Expense</button>
                        </li>
                    </div>

                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"><DatatablePage /></div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"><DatatablePage /></div>
                    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"><DatatablePage /></div>
                </div>
            </div>

            <div class=" mt-auto">
                <Footer />
            </div>
        </>

    )
}
export default AllTranscation