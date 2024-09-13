// https://stackoverflow.com/questions/13859538/simplest-inline-method-to-left-pad-a-string#comment72181150_13861999
left_pad = (num, min_digits) => `${num}`.padStart(min_digits, "0")


factory_offset_time_stamp = (offset_hours, offset_minutes, offset_seconds, offset_milliseconds) => (time_stamp_str) =>
{
    [hours, minutes, seconds_and_milliseconds] = time_stamp_str.split(":")
    ;[seconds, milliseconds] = seconds_and_milliseconds.split(",")

    hours = parseInt(hours, 10)
    minutes = parseInt(minutes, 10)
    seconds = parseInt(seconds, 10)
    milliseconds = parseInt(milliseconds, 10)

    hours += offset_hours
    minutes += offset_minutes
    seconds += offset_seconds
    milliseconds += offset_milliseconds

    extra_seconds = Math.floor(milliseconds / 1000)
    if (extra_seconds)
    {
        milliseconds -= (extra_seconds * 1000)
        seconds += extra_seconds
    }

    extra_minutes = Math.floor(seconds / 60)
    if (extra_minutes)
    {
        seconds -= (extra_minutes * 60)
        minutes += extra_minutes
    }

    extra_hours = Math.floor(minutes / 60)
    if (extra_hours)
    {
        minutes -= (extra_hours * 60)
        hours += extra_hours
    }

    return `${left_pad(hours, 2)}:${left_pad(minutes, 2)}:${left_pad(seconds, 2)},${left_pad(milliseconds, 3)}`
}


// + 00:24:13,375 - 00:00:21,440
// == + 00:23:51,935
offset_time_stamp = factory_offset_time_stamp(0, 23, 51, 935)


corrected_time_stamps = ([
["00:00:00,000", "00:00:21,440"],
["00:00:21,440", "00:00:37,360"],
["00:00:37,360", "00:00:57,680"],
["00:00:57,680", "00:01:05,440"],
["00:01:05,440", "00:01:16,000"],
["00:01:16,000", "00:01:27,680"],
["00:01:27,680", "00:01:39,840"],
["00:01:39,840", "00:01:52,960"],
["00:01:52,960", "00:02:04,920"],
["00:02:04,920", "00:02:11,440"],
["00:02:11,440", "00:02:18,720"],
["00:02:18,720", "00:02:26,240"],
["00:02:26,240", "00:02:39,520"],
["00:02:41,840", "00:02:54,400"],
["00:02:54,400", "00:03:01,840"],
["00:03:05,920", "00:03:16,320"],
["00:03:16,320", "00:03:30,720"],
["00:03:32,640", "00:03:41,760"],
["00:03:41,760", "00:03:54,800"],
["00:03:58,560", "00:04:04,560"],
["00:04:04,560", "00:04:10,160"],
["00:04:10,160", "00:04:18,240"],
["00:04:20,960", "00:04:30,160"],
["00:04:30,160", "00:04:37,040"],
["00:04:37,040", "00:04:49,360"],
["00:04:49,360", "00:04:57,600"],
["00:04:57,600", "00:05:08,880"],
["00:05:08,880", "00:05:15,840"],
]).map(pair =>
{
    return `${offset_time_stamp(pair[0])} --> ${offset_time_stamp(pair[1])}`
})
.join("\n")

console.log(corrected_time_stamps)
