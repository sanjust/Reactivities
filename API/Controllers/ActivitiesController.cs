using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    //  [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> List(Guid id)
        {
            return await _mediator.Send(new Details.Query
            {
                Id = id
            });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Create.Command activity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return await _mediator.Send(activity);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command activity)
        {
            activity.Id = id;
            return await _mediator.Send(activity);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id)
        {
            return await _mediator.Send(new Delete.Command
            {
                Id = id
            });
        }
    }
}
