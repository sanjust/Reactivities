using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {

        [HttpGet]
        public async Task<ActionResult<List<ActivityDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<ActivityDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query
            {
                Id = id
            });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Create.Command activity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return await Mediator.Send(activity);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Detail(Guid id, Edit.Command activity)
        {
            activity.Id = id;
            return await Mediator.Send(activity);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Edit(Guid id)
        {
            return await Mediator.Send(new Delete.Command
            {
                Id = id
            });
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Attend(Guid id)
        {
            return await Mediator.Send(new Attend.Command { Id = id });
        }

        [HttpDelete("{id}/delete")]
        public async Task<ActionResult<Unit>> UnAttend(Guid id)
        {
            return await Mediator.Send(new UnAttend.Command { Id = id });
        }
    }
}
