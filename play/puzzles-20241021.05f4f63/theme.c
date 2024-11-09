#include <assert.h>
#include <string.h>
#include <stdio.h>

#include "puzzles.h"

void theme_background_colour(float *ret, int offset)
{
    ret[offset * 3 + 0] = 0.14901960784313725F;
    ret[offset * 3 + 1] = 0.14901960784313725F;
    ret[offset * 3 + 2] = 0.14901960784313725F;
}

void theme_background_flash_colour(float *ret, int offset)
{
    ret[offset * 3 + 0] = 0.3215686274509804F;
    ret[offset * 3 + 1] = 0.3215686274509804F;
    ret[offset * 3 + 2] = 0.3215686274509804F;
}


void theme_grid_colour(float *ret, int offset)
{
    ret[offset * 3 + 0] = 0.45098039215686275F;
    ret[offset * 3 + 1] = 0.45098039215686275F;
    ret[offset * 3 + 2] = 0.45098039215686275F;
}

void theme_cursor_colour(float *ret, int offset)
{
    ret[offset * 3 + 0] = 0.6392156862745098F;
    ret[offset * 3 + 1] = 0.6392156862745098F;
    ret[offset * 3 + 2] = 0.6392156862745098F;
}

void theme_error_colour(float *ret, int offset)
{
    ret[offset * 3 + 0] = 0.8627450980392157F;
    ret[offset * 3 + 1] = 0.14901960784313725F;
    ret[offset * 3 + 2] = 0.14901960784313725F;
}

void theme_state_empty_colour(float *ret, int offset)
{
    ret[offset * 3 + 0] = 0.25098039215686274F;
    ret[offset * 3 + 1] = 0.25098039215686274F;
    ret[offset * 3 + 2] = 0.25098039215686274F;
}

void theme_state_yes_colour(float *ret, int offset)
{
    ret[offset * 3 + 0] = 0.8980392156862745F;
    ret[offset * 3 + 1] = 0.8980392156862745F;
    ret[offset * 3 + 2] = 0.8980392156862745F;
}

void theme_state_no_colour(float *ret, int offset)
{
    ret[offset * 3 + 0] = 0.09019607843137255F;
    ret[offset * 3 + 1] = 0.09019607843137255F;
    ret[offset * 3 + 2] = 0.09019607843137255F;
}
