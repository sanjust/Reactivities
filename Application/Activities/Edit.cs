using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public Edit()
        {
        }

        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    var activity = _context.Activities.Find(request.Id);

                    if (activity == null)
                        throw new Exception("Activity Not found");

                    activity.Title = request.Title ?? activity.Title;
                    activity.Description = request.Description ?? activity.Description;
                    activity.Category = request.Category ?? activity.Category;
                    activity.Date = request.Date ?? activity.Date;
                    activity.City = request.City ?? activity.City;
                    activity.Venue = request.Venue ?? activity.Venue;

                    var success = await _context.SaveChangesAsync() > 0;
                    return Unit.Value;
                }
                catch (Exception e)
                {
                    return Unit.Value;
                }
            }
        }
    }
}
