import React from "react";

function EisenHower() {
    const videoId = "tT89OZ7TNwc";
    return (
        <>
            <div style={{textAlign: 'left'}}>
                <section >
                <header style={{backgroundColor: 'aquamarine'}}>
                    <h1>The EisenHower Matrix</h1>
                    <h6>Master your tasks with the EisenHower Matrix</h6>
                    <p>Learn how to prioritize like a pro and get things done efficiently.</p>
                    

                </header>

                <section style={{float: 'left', width: '50%', }}>
                <img style={{width: '716px', height: '515px'}} src="https://assets.asana.biz/transform/30c95d26-15e1-4df1-9655-27b28186f0f2/inline-leadership-eisenhower-matrix-2-2x?io=transform:fill,width:768&format=webp" />
                    
                   

                </section>
                <section>
                    <iframe
                        width="700"
                        height="500"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </section>
                <section style={{backgroundColor: 'aquamarine', width: '100%', clear: 'left'}}>
                        <h3>What is the EisenHower Matrix?</h3>
                        <p >The Eisenhower Matrix is a productivity tool that helps you decide on and prioritize tasks by urgency and importance,
                        sorting them into four easy-to-understand quadrants.</p>
                    </section>
                
                </section>

                

                
            </div>
        </>
    )
}

export default EisenHower;