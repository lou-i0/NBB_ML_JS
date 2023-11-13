

//init object
const draw = {};

// Create a line 
draw.path = (ctx, path, color = "black")=>
{
    ctx.strokeStyle = color;    // define colour of line 
    ctx.lineWidth = 3;          // define width of line 
    ctx.beginPath();
    ctx.moveTo(...path[0]); // path[0] is x, y. the "..." spreads path into two sep components. 

    for(let i=1; i < path.length; i++)
    {
        ctx.lineTo(...path[i]);


    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
}

// create multi lines
draw.paths=(ctx, paths, color="black")=>
{
    for (const path of paths) 
    {
        draw.path(ctx, path, color = "black");
    }
}