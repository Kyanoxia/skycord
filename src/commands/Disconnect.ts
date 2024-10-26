import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField } from "discord.js";
import Command from "../base/classes/Command";
import CustomClient from "../base/classes/CustomClient";
import Category from "../base/enums/Category";
import SubscriberConfig from "../base/schemas/SubscriberConfig";

export default class Disconnect extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "disconnect",
            description: "Disconnect account by username (ex. \"kyanoxia.com\" or \"kyanoxia.bsky.social\"",
            category: Category.Utilities,
            default_member_permissions: PermissionsBitField.Flags.ManageWebhooks,
            global_permission: false,
            cooldown: 3,
            options: [
                {
                    name: "username",
                    description: "The username to connect (including \".bsky.social\" if applicable)",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                    choices: []
                }
            ],
            dev: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const username = interaction.options.getString("username");

        console.log(`[LOG // STATUS] Unsubscribing to ${username} in ${interaction.guildId} / ${interaction.channelId}...`)

        // If our guild isn't registered, register it
        if (!await SubscriberConfig.exists({ guildID: interaction.guildId }))
        {
            console.log(`[LOG // WARN] Cannot delete subscription in unregistered guild: ${interaction.guildId}`);
            interaction.reply({ embeds: [new EmbedBuilder()
                .setColor("Red")
                .setDescription(`❌ Can not delete subscription in unregistered guild!`)
            ]
            });
        }
        else
        {
            SubscriberConfig.find({ guildID: interaction.guildId }).then((db) => {
                var mongo = JSON.parse(db[0].props);

                // Check if our subscription is present
                for (var channel in mongo)
                {
                    for (var user in mongo[channel])
                    {
                        // Delete the subscription if we have it
                        if (user == username)
                        {
                            delete mongo[channel][user];
                        }
                        else
                        {
                            interaction.reply({ embeds: [new EmbedBuilder()
                                .setColor("Red")
                                .setDescription(`❌ Can not unsubscribe from unregistered user!`)
                            ]
                            });
                        }
                    }

                    // Delete the whole channel if it's empty
                    if (Object.keys(mongo[channel]).length == 0)
                    {
                        delete mongo[channel];
                    }
                }

                console.log(mongo);
                console.log(Object.keys(mongo).length);

                // Update the database (delete entry if empty)
                if (Object.keys(mongo).length == 0)
                {
                    SubscriberConfig.deleteMany({ guildID: interaction.guildId }).catch();
                }
                else
                {
                    SubscriberConfig.updateOne({ guildID: interaction.guildId }, { $set: { 'props': JSON.stringify(mongo) }, $currentDate: { lastModified: true } }).catch();
                }

                interaction.reply({ embeds: [new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`❌ Unsubscribed to user ${username} in channel <#${interaction.channelId}>`)
                ]
                });

                console.log(`[LOG // SUCCESS] Unsubscribed from user ${username} in ${interaction.guildId} / ${interaction.channelId}`);
            });
        }
    }
}