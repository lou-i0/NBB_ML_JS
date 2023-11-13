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

                    this.paths = [];
                    this.isDrawing=false;

                    // private method: listen for mouse events
                    //--------------------------
                    this.#addEventListeners();

                }

                // Private methods to listen to mouse events. Cannot be called.
                //=========================
                #addEventListeners()
                {
                    //=========================
                    // Record coords of mouse click
                    //=========================
                    // Web version
                    //-------------------------
                    this.canvas.onmousedown = (evt) =>  
                    {   
                        //call get_mouse function to retrieve coords
                        const mouse_coords = this.#get_mouse(evt);

                        //console.log(mouse_coords);
                        this.paths.push([mouse_coords]);
                        this.isDrawing=true;                        
                    }
                    // touchscreen version
                    //-------------------------
                    this.canvas.ontouchstart=(evt)=>
                    {
                        const touch_location = evt.touches[0];
                        this.canvas.onmousedown(touch_location);
                    }

                    //=========================
                    // Process when we are drawing 
                    //=========================
                    // For Web
                    //-------------------------
                    this.canvas.onmousemove = (evt) =>  
                    {
                        if(this.isDrawing)
                        {
                            //call get_mouse function to retrieve coords
                            const mouse_coords = this.#get_mouse(evt);
                            const lastPath = this.paths[this.paths.length-1];
                            lastPath.push(mouse_coords);  
                            
                            this.#redraw();
                        }
                    }
                    // for touchscreen.
                    //-------------------------
                    this.canvas.ontouchmove=(evt)=>
                    {
                        const touch_location = evt.touches[0];
                        this.canvas.onmousemove(touch_location);
                    }

                    //=========================
                    // essentially end line drawn.
                    //=========================
                    // For Web 
                    //-------------------------
                    this.canvas.onmouseup =()=> {this.isDrawing=false;}
                    // for touchscreen.
                    //-------------------------
                    this.canvas.ontouchend=()=>{this.canvas.onmouseup();}

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

                    draw.paths(this.ctx, this.paths);
                }

            }