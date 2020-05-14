/**
 * Copyright (c) 2020, cic Inc. (http://www.cic.org) All Rights Reserved.
 *
 * cic Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

import { StoryCategories } from "../../hierarchy";
import { StoryMetaInterface } from "../../models";

export const meta: StoryMetaInterface = {
    components: [ "AppAvatar" ],
    description: "Avatar component to display app avatars.",
    stories: [
        {
            description: "Avatar with application name initials.",
            title: "Initials",
        },
        {
            description: "Avatar from image.",
            title: "From Image",
        },
        {
            description: "Avatar to display loading status.",
            title: "Placeholder",
        },
        {
            description: "Different app avatar sizes. `mini`, `little`, `tiny` and `small` are displayed here." +
                "All the other `Semantic UI` sizes are also supported.",
            title: "Sizes",
        },
        {
            description: "Play around with different props to dynamically interact with the app avatar component.",
            title: "Playground"
        }
    ],
    title: `${ StoryCategories.COMPONENTS }/App Avatar`,
};
