class DrawBox{
                //=========================
                // Method to draw canvas box
                //=========================
                constructor(container,size = 400)
                {
                    // builds the canvas window
                    //=========================
                    this.canvas = document.createElement("canvas");
                    this.canvas.width = size;
                    this.canvas.height = size;
                    this.canvas.style = `
                                        background-color:white;
                                        box-shadow: 0px 0px 10px 2px black;
                                        `;
                    container.appendChild(this.canvas);

                    // draw onto the canvas
                    //=========================
                    this.ctx = this.canvas.getContext("2d"); // to draw in 2d space context

                    this.path = [];
                    this.isDrawing=false;

                    // private method: listen for mouse events
                    //--------------------------
                    this.#addEventListeners();

                }

                // Private methods to listen to mouse events. Cannot be called.
                //=========================
                #addEventListeners()
                {
                    // will record coords of mouse click
                    //--------------------------
                    this.canvas.onmousedown = (evt) =>  
                    {   
                        //call get_mouse function to retrieve coords
                        const mouse_coords = this.#get_mouse(evt);

                        //console.log(mouse_coords);
                        this.path=[mouse_coords];
                        this.isDrawing=true;                        
                    }

                    // only process when we are drawing 
                    //--------------------------
                    this.canvas.onmousemove = (evt) =>  
                    {
                        if(this.isDrawing)
                        {
                            //call get_mouse function to retrieve coords
                            const mouse_coords = this.#get_mouse(evt);

                            // console.log(mouse_coords);
                            this.path.push(mouse_coords);
                            //console.log(this.path.length);   
                            
                            this.#redraw();
                        }
                }
                    // essentially end line drawn.
                    //--------------------------
                    this.canvas.onmouseup =()=> {this.isDrawing=false;}
                }
                

                // Method to retrieve coords
                //=========================
                #get_mouse=(evt)=>
                {
                    const rect = this.canvas.getBoundingClientRect();
                    return [
                                Math.round(evt.clientX - rect.left) // x coord based on left of canvas rectangle.
                                ,Math.round(evt.clientY - rect.top) // y coord based on top of canvas rectangle.
                           ];
                }

                #redraw()
                {
                    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); //clear canvas

                    draw.path(this.ctx, this.path);
                }

            }