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
                    this.ctx = this.container.getContext("2d"); // to draw in 2d space context

                    // private method: listen for mouse events
                    //--------------------------
                    this.#addEventListeners();

                }

                // Private methods to listen to mouse events. Cannot be called.
                #addEventListeners()
                {
                    this.canvas.onmousedown = (evt) =>  {
                                                            const rect = this.canvas.getBoundingClientRect();
                                                            const mouse_coords = [
                                                                                    evt.clientX - rect.lef
                                                                                    ,evt.clientY - rect.top
                                                                                 ];
                                                            console.log(mouse_coords);
                                                        }
                }
            }